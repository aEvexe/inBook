import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { AdminService } from '../admin/admin.service';

@Module({
  imports: [JwtModule.register({}), AdminModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
  exports: [AdminAuthService]
})
export class AdminAuthModule {}
