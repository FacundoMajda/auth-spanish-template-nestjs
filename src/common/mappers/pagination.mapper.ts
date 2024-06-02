import { Injectable } from '@nestjs/common';
import { PageDto } from '../dto/page.dto';
import { BaseSearchDto } from '../dto/base-search.dto';

@Injectable()
export class PaginattionMapper {
  createPageDto<T, V extends BaseSearchDto>(
    page: PageDto<T>,
    request: V,
    dtos: T[],
  ): PageDto<T> {
    const pageDto = new PageDto<T>(dtos, page.metadata.count);
    const pageNumber = request.getPageNumber();
    const pageSize = request.getTake();
    pageDto.metadata.setPaginationData(pageNumber, pageSize);
    pageDto.metadata.sortBy = request.sortBy;
    return pageDto;
  }
}
