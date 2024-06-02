import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PageMetadataDto } from './page-metadata.dto';

export class PageDto<T> {
  @ApiProperty()
  @Expose()
  data: T[];

  @ApiProperty({ type: PageMetadataDto })
  @Expose()
  metadata: PageMetadataDto;

  constructor(data: T[], count: number) {
    this.data = data;
    this.metadata = new PageMetadataDto(count);
  }
}
