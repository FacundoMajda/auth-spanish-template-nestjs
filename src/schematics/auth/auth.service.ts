import 'dotenv/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { PasswordHelper } from 'src/common/utils/password-helper';
import { UserDTO } from '../user/dto/user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginRequestDto } from './dto/login.dto';
import { RegisterRequestDto } from './dto/register.dto';
import { ERRORS } from 'src/common/errors/errors-codes';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordHelper: PasswordHelper,
  ) {}

  private generateToken(payload: any) {
    return sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.find({
      where: { email: email },
    });

    if (
      !user &&
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

    return {
      access_token: this.generateToken(payload),
    };
  }
}
