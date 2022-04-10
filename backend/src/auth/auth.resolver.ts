import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { RefreshAuthGuard } from 'src/guards/refresh-auth.guard';
import { errorHandler } from 'src/utils/errorHandler';

import { AuthService } from './auth.service';

import { JwtType } from './auth.type';

@Resolver((of) => JwtType)
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @UseGuards(RefreshAuthGuard)
  @Mutation((returns) => String)
  async refreshUserToken(@Context() context) {
    const tokens = await this.authService.logInUser(context.req.user._id);

    context.res?.cookie(
      'auth_cookie',
      { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken },
      { httpOnly: true },
    );

    return 'Success';
  }

  @Mutation((returns) => String)
  async googleAuth(@Args('token') token: string, @Context() context) {
    try {
      const loginUserTokens = await this.authService.AuthenticateWithGoogle(
        token,
      );

      const { accessToken, refreshToken } = loginUserTokens;

      context.res?.cookie(
        'auth_cookie',
        { accessToken, refreshToken },
        { httpOnly: true },
      );

      return 'Success';
    } catch {
      return errorHandler('Something went wrong, try again.', '400');
    }
  }
}
