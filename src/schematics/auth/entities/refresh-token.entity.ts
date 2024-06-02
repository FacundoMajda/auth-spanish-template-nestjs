import { BaseEntity } from 'src/common/models/baseentity';
import { Column, Entity } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken extends BaseEntity {
  @Column()
  @IsNotEmpty({ message: 'El token es obligatorio.' })
  @IsString({ message: 'El token debe ser una cadena de texto.' })
  @Expose()
  token: string;

  @Column()
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio.' })
  @IsNumber({}, { message: 'El ID del usuario debe ser un número.' })
  @Expose()
  userId: number;

  @Column()
  @IsNotEmpty({ message: 'La fecha de expiración es obligatoria.' })
  @Expose()
  expiryDate: Date;
}
