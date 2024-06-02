import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsEqual } from 'src/common/decorators/is-equal.decorator';
import { name_regex } from 'src/common/interfaces/regex/name_regex';
import { pass_regex } from 'src/common/interfaces/regex/pass_regex';

export class CreateUserRequestDto {
  @ApiProperty({ description: 'El nombre del del usuario.' })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio.' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres.',
  })
  @MaxLength(20, {
    message: 'El nombre de usuario no puede tener más de 20 caracteres.',
  })
  @Matches(name_regex, { message: 'Nombre de usuario inválido.' })
  @Expose()
  username: string;

  @ApiProperty({ description: 'El correo electrónico del usuario.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail({}, { message: 'Correo electrónico inválido.' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'La contraseña del usuario.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(20, {
    message: 'La contraseña no puede tener más de 20 caracteres.',
  })
  @Matches(pass_regex, { message: 'Contraseña debíl.' })
  @Expose()
  password: string;

  @ApiProperty({ description: 'La repetición de la contraseña del usuario.' })
  @IsNotEmpty({ message: 'La repetición de la contraseña es obligatoria.' })
  @IsString({
    message: 'La repetición de la contraseña debe ser una cadena de texto.',
  })
  @MinLength(8, {
    message: 'La repetición de la contraseña debe tener al menos 8 caracteres.',
  })
  @MaxLength(20, {
    message:
      'La repetición de la contraseña no puede tener más de 20 caracteres.',
  })
  @Matches(pass_regex, { message: 'Repetición de contraseña debíl.' })
  @IsEqual('password', { message: 'Las contraseñas no coinciden.' })
  @Expose()
  repeatPassword: string;
}
