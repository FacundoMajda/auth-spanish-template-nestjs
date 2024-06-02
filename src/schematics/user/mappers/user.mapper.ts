import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PageDto } from 'src/common/dto/page.dto';
import { UserDTO } from '../dto/user.dto';
import { CreateUserRequestDto } from '../dto/create-user-request.dto';
import { SearchUserDto } from '../dto/search-user-request.dto';
import { UpdateUserRequestDto } from '../dto/update-user-request.dto';
import { User } from '../entities/user.entity';
import { PasswordHelper } from '../../../common/utils/password-helper';

@Injectable()
export class UserMapper {
  private passwordHelper = new PasswordHelper();

  async entity2DTO(user: User): Promise<UserDTO> {
    return plainToInstance(UserDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  async page2Dto(
    request: SearchUserDto,
    page: PageDto<User>,
  ): Promise<PageDto<UserDTO>> {
    const dtos = await Promise.all(
      page.data.map(async (user) => {
        return this.entity2DTO(user);
      }),
    );
    const pageDto = new PageDto<UserDTO>(dtos, page.metadata.count);
    pageDto.metadata.setPaginationData(1, 10);
    pageDto.metadata.sortBy = request.sortBy;
    return pageDto;
  }

  async createDTO2Entity(request: CreateUserRequestDto): Promise<User> {
    const newUser: User = new User();
    newUser.username = request.username;
    newUser.email = request.email;
    // newUser.password = request.password;
    newUser.password = await this.passwordHelper.hashPassword(
      request.password,
      10,
    );
    return newUser;
  }

  async updateDTO2Entity(
    editUser: User,
    request: UpdateUserRequestDto,
  ): Promise<User> {
    request.username && (editUser.username = request.username);
    request.email && (editUser.email = request.email);
    // request.password && (editUser.password = request.password);
    if (request.password !== undefined) {
      editUser.password = await this.passwordHelper.hashPassword(
        request.password,
        10,
      );
    }
    return editUser;
  }
}
