import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { PageDto } from 'src/common/dto/page.dto';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { SearchUserDto } from './dto/search-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { plainToClass } from 'class-transformer';

@ApiTags('users')
@Injectable()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('search')
  @ApiOperation({
    summary: 'Buscar usuarios',
    description:
      'Permite buscar usuarios según los criterios especificados en la solicitud.',
  })
  @ApiOkResponse({
    type: PageDto,
    description: 'Lista paginada de usuarios encontrada.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  async search(@Query() request: SearchUserDto): Promise<PageDto<UserDTO>> {
    const req = plainToClass(SearchUserDto, request);
    return await this.userService.searchUser(req);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo usuario',
    description: 'Permite crear un nuevo usuario con los datos proporcionados.',
  })
  @ApiBody({
    type: CreateUserRequestDto,
    description: 'Datos del nuevo usuario a crear.',
  })
  @ApiOkResponse({
    type: UserDTO,
    description: 'Usuario creado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  async create(
    @Body() createUserRequestDto: CreateUserRequestDto,
  ): Promise<UserDTO> {
    return await this.userService.create(createUserRequestDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario existente',
    description:
      'Permite actualizar los datos de un usuario existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del usuario a actualizar.',
  })
  @ApiBody({
    type: UpdateUserRequestDto,
    description: 'Datos nuevos del usuario.',
  })
  @ApiOkResponse({
    type: UserDTO,
    description: 'Usuario actualizado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UserDTO> {
    return await this.userService.update(id, updateUserRequestDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener detalles de un usuario',
    description:
      'Obtiene los detalles de un usuario específico mediante su ID.',
  })
  @ApiParam({ name: 'id', required: true, description: 'ID del usuario.' })
  @ApiOkResponse({
    type: UserDTO,
    description: 'Detalles del usuario obtenidos correctamente.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDTO> {
    return await this.userService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description: 'Permite eliminar un usuario existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del usuario a eliminar.',
  })
  @ApiOkResponse({ description: 'Usuario eliminado correctamente.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return await this.userService.remove(id);
  }
}
