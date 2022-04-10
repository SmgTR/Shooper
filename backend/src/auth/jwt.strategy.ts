import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Staff } from 'src/entities/staff.entity';
import { Request } from 'express';
import { JwtPayload } from './jwt-payload.interface';
import { Users } from 'src/entities/user.entity';
import { User } from './auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Staff) private staffRepository: Repository<Staff>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
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
  async validate(payload: JwtPayload) {
    if (payload === null) throw new UnauthorizedException();
    const { id } = payload;

    let user: User = await this.staffRepository.findOne(id);
    if (!user) {
      user = await this.usersRepository.findOne(id);
    }

    if (!user) UnauthorizedException;

    return user;
  }
}
