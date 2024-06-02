import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserDTO } from '../user/dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description:
      'Permite registrar un nuevo usuario con los datos proporcionados.',
  })
  @ApiBody({
    type: RegisterRequestDto,
    description: 'Datos del nuevo usuario a registrar.',
  })
  @ApiOkResponse({
    type: UserDTO,
    description: 'Usuario registrado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<UserDTO> {
    return await this.authService.register(registerRequestDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Permite que un usuario inicie sesión con su correo electrónico y contraseña.',
  })
  @ApiBody({
    type: LoginRequestDto,
    description: 'Datos de inicio de sesión del usuario.',
  })
  @ApiOkResponse({
    description: 'Inicio de sesión exitoso. Se devuelve el token de acceso.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos de inicio de sesión inválidos.',
  })
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { access_token, refresh_token } =
      await this.authService.login(loginRequestDto);
    return { access_token, refresh_token };
  }
}
