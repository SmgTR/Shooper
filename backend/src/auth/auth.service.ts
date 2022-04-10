import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

import { errorCodes, errorHandler } from 'src/utils/errorHandler';
import { User } from './auth.type';

import { Users } from 'src/entities/user.entity';
import { Staff } from 'src/entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { google, Auth } from 'googleapis';

import * as randomToken from 'rand-token';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Staff) private staffRepository: Repository<Staff>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    const clientID = this.configService.get('GOOGLE_APP');
    const clientSecret = this.configService.get('GOOGLE_KEY');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async logInUser(
    id: string,
  ): Promise<{ _id: string; accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = { id };

    const refreshToken = await this.getRefreshToken(id);

    const accessToken: string = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    const _id = id;
    return { _id, accessToken, refreshToken };
  }

  async AuthenticateWithGoogle(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    try {
      const user = await this.usersRepository.findOne({ email });

      if (user) return await this.logInUser(user._id);
    } catch (err) {
      if (err.status !== 404) {
        errorHandler('Something went wrong, try again.', '404');
      }
    }

    return this.CreateWithGoogle(token, email);
  }

  async GetGoogleUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });
    return userInfoResponse.data;
  }

  async CreateWithGoogle(token: string, email: string) {
    const userData = await this.GetGoogleUserData(token);
    const name = userData.given_name ?? userData.name;
    const newUser = await this.usersRepository.create({
      email,
      name,
      provider: 'google',
      createdAt: new Date(),
    });
    if (userData.family_name) newUser.lastName = userData.family_name;

    const user = await this.usersRepository.save(newUser);
    return await this.logInUser(user._id);
  }

  async getMe(user): Promise<User> {
    return user;
  }

  async getRefreshToken(userId: string): Promise<string> {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: moment().day(7).format('YYYY/MM/DD'),
    };

    const user =
      (await this.usersRepository.findOne(userId)) ??
      (await this.staffRepository.findOne(userId));

    user.refreshToken = userDataToUpdate;

    await this.usersRepository.save(user);

    return userDataToUpdate.refreshToken;
  }
}
