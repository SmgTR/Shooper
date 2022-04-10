import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from 'src/mail/mail.module';

import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from 'src/products/products.module';
import { Users } from '../entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => AuthModule),
    forwardRef(() => MailModule),
    forwardRef(() => ProductsModule),
  ],

  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
