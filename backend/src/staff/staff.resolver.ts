import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { CreateStaffInput, StaffCredentials } from './staff.input';
import { StaffService } from './staff.service';
import { StaffType, UserStatus } from './staff.type';

import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { CtxUser } from 'src/decorators/ctx-user.decorator';
import { LoginType, User } from 'src/auth/auth.type';
import { RolesGuard } from 'src/guards/role-auth.guard';
import { Roles } from 'src/decorators/role-user.decorator';

@Resolver((of) => StaffType)
export class StaffResolver {
  constructor(private staffService: StaffService) {}

  @Roles(UserStatus.ADMIN)
  @UseGuards(GqlAuthGuard)
  @Query((returns) => StaffType)
  async staffUser(@CtxUser() user: User, @Args('search') search: string) {
    return this.staffService.FindUser(user._id, search);
  }

  @Roles(UserStatus.ADMIN, UserStatus.MODERATOR)
  @UseGuards(GqlAuthGuard)
  @Query((returns) => StaffType)
  async LoggedIn(@CtxUser() user: User) {
    return this.staffService.GetLoggedIn(user);
  }

  @Mutation((returns) => StaffType)
  async createAdminAccount() {
    return this.staffService.CreateAdminAccount();
  }

  @Roles(UserStatus.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation((returns) => StaffType)
  async createStaffUser(
    @CtxUser() user: StaffType,
    @Args('createStaffInput')
    createStaffInput: CreateStaffInput,
  ) {
    return this.staffService.StaffSignUp(user, createStaffInput);
  }

  @Mutation((returns) => LoginType)
  async LogInStaffUser(
    @Args('staffCredentials')
    staffCredentials: StaffCredentials,
    @Context() context,
  ) {
    const user = await this.staffService.LogInStaff(staffCredentials);

    if (user) {
      context.res?.cookie(
        'auth_cookie',
        { accessToken: user.accessToken, refreshToken: user.refreshToken },
        { httpOnly: true },
      );
    }

    return user;
  }
}
