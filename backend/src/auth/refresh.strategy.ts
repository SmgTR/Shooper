import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Staff } from 'src/entities/staff.entity';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import * as moment from 'moment';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @InjectRepository(Staff) private staffRepository: Repository<Staff>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    super({
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['auth_cookie'];
          if (!data) {
            return null;
          }

          return data.accessToken;
        },
      ]),
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    if (!payload.id) {
      throw new BadRequestException('invalid jwt token');
    }
    const data = req?.cookies['auth_cookie'];
    if (!data?.refreshToken) {
      throw new BadRequestException('invalid refresh token');
    }

    const user = await this.usersRepository.findOne(payload.id);

    if (!user) {
      throw new BadRequestException('token expired');
    }

    if (data.refreshToken !== user.refreshToken.refreshToken) {
      throw new BadRequestException('invalid refresh token');
    }

    if (moment().isAfter(new Date(user.refreshToken.refreshTokenExp))) {
      console.log('da');
      throw new UnauthorizedException();
    }

    return user;
  }
}
