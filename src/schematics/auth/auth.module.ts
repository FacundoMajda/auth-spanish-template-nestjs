import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordHelper } from 'src/common/utils/password-helper';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, PasswordHelper],
})
export class AuthModule {}
