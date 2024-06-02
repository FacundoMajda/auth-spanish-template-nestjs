import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { name_regex } from 'src/common/interfaces/regex/name_regex';
import { pass_regex } from 'src/common/interfaces/regex/pass_regex';
import { BaseEntity } from 'src/common/models/baseentity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
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

  @Column()
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail({}, { message: 'Correo electrónico inválido.' })
  @Expose()
  email: string;

  @Column()
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(20, {
    message: 'La contraseña no puede tener más de 20 caracteres.',
  })
  @Matches(pass_regex, { message: 'Contraseña inválida.' })
  @Expose()
  password: string;

  static fromId(entity: User): User {
    const user = new User();
    user.id = entity.id;
    user.username = entity.username;
    user.email = entity.email;
    // user.password = entity.password;
    return user;
  }
}
