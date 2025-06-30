import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { UserGuard } from '../common/guards/user.guard';

@Module({
  imports: [JwtModule.register({}), UsersModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
