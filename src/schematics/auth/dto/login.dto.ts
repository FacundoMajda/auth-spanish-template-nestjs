import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ description: 'El correo electrónico del usuario.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail({}, { message: 'Correo electrónico inválido.' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'La contraseña del usuario.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  // @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  // @MaxLength(20, {
  //   message: 'La contraseña no puede tener más de 20 caracteres.',
  // })
  @Expose()
  password: string;
}
