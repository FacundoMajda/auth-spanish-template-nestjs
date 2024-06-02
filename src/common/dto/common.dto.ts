import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class CommonDTO {
  @ApiProperty({
    description: 'Id de la entidad a insertar/modificar',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Fecha de actualización',
    type: Date,
    default: new Date(),
  })
  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({
    description: 'Fecha de eliminación',
    type: Date,
    default: new Date(),
  })
  @IsDate()
  @IsOptional()
  deletedAt: Date;

  // @ApiProperty({
  //   description: 'Estado',
  //   type: Boolean,
  // })
  // @IsBoolean()
  // @IsOptional()
  // active: boolean;
}
