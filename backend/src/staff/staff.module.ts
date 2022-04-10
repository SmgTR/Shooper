import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffService } from './staff.service';
import { Staff } from '../entities/staff.entity';
import { StaffResolver } from './staff.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Staff]), forwardRef(() => AuthModule)],
  providers: [StaffService, StaffResolver],
})
export class StaffModule {}
