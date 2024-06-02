import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UserMapper } from './mappers/user.mapper';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';
import { SearchUserDto } from './dto/search-user-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { ERRORS } from 'src/common/errors/errors-codes';

@Injectable()
export class UserService {
  constructor(
    private userMapper: UserMapper,
    private userRepository: UserRepository,
  ) {}

  async find(criteria?: any): Promise<User> {
    const user = await this.userRepository.findOne(criteria);
    if (!user) {
      throw new NotFoundException({
        code: ERRORS.DATABASE.RECORD_NOT_FOUND.CODE,
        message: [
          `${ERRORS.DATABASE.RECORD_NOT_FOUND.MESSAGE}`,
          `Criterio: ${JSON.stringify(criteria)}`,
        ],
      });
    }
    return user;
  }

  async findOne(id: number): Promise<UserDTO> {
    const user = await this.find({ where: { id } });
    return this.userMapper.entity2DTO(user);
  }

  async searchUser(request: SearchUserDto): Promise<PageDto<UserDTO>> {
    try {
      const userPage = await this.userRepository.search(request);
      return this.userMapper.page2Dto(request, userPage);
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: [
          `${ERRORS.VALIDATION.INVALID_INPUT.MESSAGE}`,
          `Criterios de búsqueda: ${JSON.stringify(request)}`,
          `Detalles: ${error.message}`,
        ],
      });
    }
  }

  async create(request: CreateUserRequestDto): Promise<UserDTO> {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: request.email }],
    });

    if (existingUser) {
      throw new BadRequestException({
        code: ERRORS.USER.EMAIL_ALREADY_EXISTS.CODE,
        message: [
          `${ERRORS.USER.EMAIL_ALREADY_EXISTS.MESSAGE}`,
          `Correo electrónico: ${request.email}`,
        ],
      });
    }

    try {
      const newUser = await this.userMapper.createDTO2Entity(request);
      await this.userRepository.save(newUser);
      return this.userMapper.entity2DTO(newUser);
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: [
          `${ERRORS.VALIDATION.INVALID_INPUT.MESSAGE}`,
          `Detalles: ${error.message}`,
        ],
      });
    }
  }

  async update(id: number, request: UpdateUserRequestDto): Promise<UserDTO> {
    const user = await this.find({ where: { id } });

    try {
      const updatedUser = await this.userMapper.updateDTO2Entity(user, request);
      await this.userRepository.save(updatedUser);
      return this.userMapper.entity2DTO(updatedUser);
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: [
          `${ERRORS.VALIDATION.INVALID_INPUT.MESSAGE}`,
          `ID de usuario: ${id}`,
          `Detalles: ${error.message}`,
        ],
      });
    }
  }

  async remove(id: number): Promise<string> {
    const user = await this.find({ where: { id } });

    try {
      await this.userRepository.softRemove(user);
      return 'Usuario eliminado';
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: [
          `${ERRORS.VALIDATION.INVALID_INPUT.MESSAGE}`,
          `ID de usuario: ${id}`,
          `Detalles: ${error.message}`,
        ],
      });
    }
  }
}
