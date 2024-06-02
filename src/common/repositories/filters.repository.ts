import { SelectQueryBuilder } from 'typeorm';
import { OrderByDto } from '../dto/order-by.dto';
import { PageDto } from '../dto/page.dto';

export interface ParamsFilter {
  filter: string;
  value: any;
  isString?: boolean;
}

export class FilterRepository<T> {
  private static instance: FilterRepository<any>;
  queryBuilder: SelectQueryBuilder<T>;

  public static getInstance(): FilterRepository<any> {
    if (!FilterRepository.instance) {
      FilterRepository.instance = new FilterRepository<any>();
    }
    return FilterRepository.instance;
  }

  addFilter({ filter, value, isString = true }: ParamsFilter) {
    const where = isString
      ? `UPPER(${this.queryBuilder.alias}.${filter}) LIKE :${filter}`
      : `${this.queryBuilder.alias}.${filter} = :${filter}`;
    const paramValue = isString ? `%${value.toUpperCase()}%` : value;
    if (value) {
      this.queryBuilder.andWhere(where).setParameter(filter, paramValue);
    }
  }

  orderBy(orderByDto: OrderByDto) {
    return this.queryBuilder.addOrderBy(
      `${this.queryBuilder.alias}.${orderByDto.getSortBy()}`,
      orderByDto.getOrderBy() == 'ASC' ? 'ASC' : 'DESC',
    );
  }

  async getList(offset: number, take: number): Promise<[T[], number]> {
    return await this.queryBuilder
      .skip(offset ?? 0)
      .take(take ?? 10)
      .getManyAndCount();
  }

  async getPaginatedList(offset = 0, take = 10): Promise<PageDto<T>> {
    const [list, count] = await this.getList(offset, take);
    return new PageDto<T>(list, count);
  }
}
