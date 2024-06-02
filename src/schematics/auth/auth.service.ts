import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { ERRORS } from 'src/common/errors/errors-codes';
import { PasswordHelper } from 'src/common/utils/password-helper';
import { UserDTO } from '../user/dto/user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginRequestDto } from './dto/login.dto';
import { RegisterRequestDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private passwordHelper: PasswordHelper,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async generateUserTokens(payload: {
    email: string;
    sub: number;
  }): Promise<{ access_token: string; refresh_token: string }> {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = uuidv4();

    const newRefreshToken = new RefreshToken();
    newRefreshToken.token = refreshToken;
    newRefreshToken.userId = payload.sub;
    newRefreshToken.expiryDate = new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000,
    ); // Expires in 1 day

    await this.refreshTokenRepository.save(newRefreshToken);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.find({
      where: { email: email },
    });

    if (
      !user ||
      !(await this.passwordHelper.validate(password, user.password))
    ) {
      throw new UnauthorizedException({
        code: ERRORS.AUTHENTICATION.INVALID_CREDENTIALS.CODE,
        message: ERRORS.AUTHENTICATION.INVALID_CREDENTIALS.MESSAGE,
      });
    }

    return user;
  }

  async register(registerRequestDto: RegisterRequestDto): Promise<UserDTO> {
    return await this.userService.create(registerRequestDto);
  }

  async login(loginRequestDto: LoginRequestDto) {
    const user = await this.validateUser(
      loginRequestDto.email,
      loginRequestDto.password,
    );

    const userId = user.id;
    const payload = { email: loginRequestDto.email, sub: userId };

    const tokens = await this.generateUserTokens(payload);

    return tokens;
  }
}
