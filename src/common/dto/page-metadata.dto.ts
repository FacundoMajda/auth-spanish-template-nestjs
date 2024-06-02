import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PageMetadataDto {
  @ApiProperty()
  @Expose()
  count: number;

  @ApiProperty()
  @Expose()
  pageSize: number;

  @ApiProperty()
  @Expose()
  pageNumber: number;

  @ApiProperty()
  @Expose()
  totalPages: number;

  @ApiProperty()
  @Expose()
  sortBy: string;

  constructor(count: number) {
    this.count = count;
  }

  setPaginationData(pageNumber: number, pageSize: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalPages = Math.ceil(this.count / this.pageSize);
  }
}
