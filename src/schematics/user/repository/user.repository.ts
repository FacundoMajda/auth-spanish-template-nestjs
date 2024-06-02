import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { SearchUserDto } from '../dto/search-user-request.dto';
import { PageDto } from 'src/common/dto/page.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async search(request: SearchUserDto): Promise<PageDto<User>> {
    const queryBuilder: SelectQueryBuilder<User> =
      this.dataSource.createQueryBuilder(User, 'user');

    if (request.username) {
      queryBuilder.andWhere('user.username = :username', {
        username: request.username,
      });
    }
    if (request.id) {
      queryBuilder.andWhere('user.id = :id', {
        id: request.id,
      });
    }
    queryBuilder.orderBy('user.username', 'ASC');
    queryBuilder.orderBy('user.id', 'DESC');

    const [list, count] = await queryBuilder
      .skip(request.getOffset())
      .take(request.getTake())
      .getManyAndCount();

    return new PageDto<User>(list, count);
  }
}
