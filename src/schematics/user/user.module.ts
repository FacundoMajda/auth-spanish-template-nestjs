import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserMapper } from './mappers/user.mapper';
import { UserRepository } from './repository/user.repository';
import { PasswordHelper } from 'src/common/utils/password-helper';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, UserMapper, UserRepository, PasswordHelper],
  exports: [UserService],
})
export class UserModule {}
