import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { pass_regex } from 'src/common/interfaces/regex/pass_regex';
import { Expose } from 'class-transformer';

export class ResetPasswordDto {
  @ApiProperty({ description: 'El correo electrónico del usuario.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail({}, { message: 'Correo electrónico inválido.' })
  @Expose()
  email: string;

  //   @ApiProperty({ description: 'La contraseña anterior del usuario.' })
  //   @IsNotEmpty({ message: 'La contraseña anterior es obligatoria.' })
  //   @IsString({ message: 'La contraseña anterior debe ser una cadena de texto.' })
  //   @MinLength(8, {
  //     message: 'La contraseña anterior debe tener al menos 8 caracteres.',
  //   })
  //   @MaxLength(20, {
  //     message: 'La contraseña anterior no puede tener más de 20 caracteres.',
  //   })
  //   @Matches(pass_regex, { message: 'Contraseña anterior inválida.' })
  //   oldPassword: string;

  @ApiProperty({ description: 'La nueva contraseña del usuario.' })
  @IsNotEmpty({ message: 'La nueva contraseña es obligatoria.' })
  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto.' })
  @MinLength(8, {
    message: 'La nueva contraseña debe tener al menos 8 caracteres.',
  })
  @MaxLength(20, {
    message: 'La nueva contraseña no puede tener más de 20 caracteres.',
  })
  @Matches(pass_regex, { message: 'Contraseña debíl.' })
  @Expose()
  newPassword: string;

  @ApiProperty({
    description: 'La repetición de la nueva contraseña del usuario.',
  })
  @IsNotEmpty({
    message: 'La repetición de la nueva contraseña es obligatoria.',
  })
  @IsString({
    message:
      'La repetición de la nueva contraseña debe ser una cadena de texto.',
  })
  @MinLength(8, {
    message:
      'La repetición de la nueva contraseña debe tener al menos 8 caracteres.',
  })
  @MaxLength(20, {
    message:
      'La repetición de la nueva contraseña no puede tener más de 20 caracteres.',
  })
  @Matches(pass_regex, { message: 'Repetición de contraseña debíl.' })
  @Expose()
  repeatNewPassword: string;
}
