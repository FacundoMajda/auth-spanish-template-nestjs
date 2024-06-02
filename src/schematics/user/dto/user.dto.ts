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
import { CommonDTO } from 'src/common/dto/common.dto';
import { name_regex } from 'src/common/interfaces/regex/name_regex';
// import { pass_regex } from 'src/common/interfaces/regex/pass_regex';

export class UserDTO extends CommonDTO {
  @ApiProperty({ description: 'El nombre del del usuario.' })
  @Expose()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio.' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres.',
  })
  @MaxLength(20, {
    message: 'El nombre de usuario no puede tener más de 20 caracteres.',
  })
  @Matches(name_regex, { message: 'Nombre de usuario inválido.' })
  username: string;

  @ApiProperty({ description: 'El correo electrónico del usuario.' })
  @Expose()
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail({}, { message: 'Correo electrónico inválido.' })
  email: string;

  @ApiProperty({ description: 'La contraseña del usuario.' })
  @Expose()
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  password: string;
}
