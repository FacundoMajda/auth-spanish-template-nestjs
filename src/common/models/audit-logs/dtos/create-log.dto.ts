import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLogDTO {
  @ApiProperty({
    description: 'User Id',
    type: Number,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'User Name',
    type: String,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Route',
    type: String,
  })
  @IsString()
  route: string;

  @ApiProperty({
    description: 'Action',
    type: String,
  })
  @IsString()
  action: string;

  @ApiProperty({
    description: 'Method',
    type: String,
  })
  @IsString()
  method: string;

  @ApiProperty({
    description: 'Body',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  params: string;

  @ApiProperty({
    description: 'Query',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  query: string;
}
