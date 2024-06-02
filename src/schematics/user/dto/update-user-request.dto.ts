import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequestDto } from './create-user-request.dto';

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {}
