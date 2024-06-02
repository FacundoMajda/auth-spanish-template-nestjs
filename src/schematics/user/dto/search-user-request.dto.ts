import { ApiProperty } from '@nestjs/swagger';
import { BaseSearchDto } from 'src/common/dto/base-search.dto';
import {
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class SearchUserDto extends BaseSearchDto {
  @ApiProperty({
    description: 'Nombre para buscar',
    type: String,
    required: false,
  })
  @Expose()
  @IsOptional({ message: 'El nombre es opcional.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres.' })
  username: string;

  @ApiProperty({
    description: 'ID de User a buscar',
    type: Number,
    required: false,
  })
  @Expose()
  @IsOptional({ message: 'El ID es opcional.' })
  @IsNumber()
  @Min(1, { message: 'El ID debe ser un número positivo.' })
  id: number;
}
