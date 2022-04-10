import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Staff } from 'src/entities/staff.entity';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { RolesGuard } from '../guards/role-auth.guard';
import { Users } from 'src/entities/user.entity';
import { RefreshStrategy } from './refresh.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, Staff, Users]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    RolesGuard,
    RefreshStrategy,
  ],
  exports: [AuthService, PassportModule, JwtStrategy, RefreshStrategy],
})
export class AuthModule {}
