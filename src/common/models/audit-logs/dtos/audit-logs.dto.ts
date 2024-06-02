import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class AuditLogsDTO {
  @ApiProperty({
    description: 'User Id',
    type: Number,
  })
  @IsNumber()
  @Expose()
  userId: number;

  @ApiProperty({
    description: 'User Name',
    type: String,
  })
  @IsString()
  @Expose()
  username: string;

  @ApiProperty({
    description: 'Route',
    type: String,
  })
  @IsString()
  @Expose()
  route: string;

  @ApiProperty({
    description: 'Action',
    type: String,
  })
  @IsString()
  @Expose()
  action: string;

  @ApiProperty({
    description: 'Method',
    type: String,
  })
  @IsString()
  @Expose()
  method: string;

  @ApiProperty({
    description: 'Body',
    type: String,
    required: false,
  })
  @IsString()
  @Expose()
  params: string;

  @ApiProperty({
    description: 'Query',
    type: String,
    required: false,
  })
  @IsString()
  @Expose()
  query: string;
}
