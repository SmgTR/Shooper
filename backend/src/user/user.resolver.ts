import { ShopUser } from './user.type';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  Parent,
  ResolveField,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { ProductsService } from 'src/products/products.service';
import { UserService } from './user.service';
import {
  ManageUserCartInput,
  CreateUserInput,
  UserCredentials,
} from './user.input';
import { CtxUser } from 'src/decorators/ctx-user.decorator';
import { CartItem } from 'src/models/cart.model';
import { LoginType, User } from 'src/auth/auth.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { RolesGuard } from 'src/guards/role-auth.guard';
import { Roles } from 'src/decorators/role-user.decorator';
import { UserStatus } from 'src/staff/staff.type';
import { errorHandler } from 'src/utils/errorHandler';

@Resolver((of) => ShopUser)
export class UserResolver {
  constructor(
    private userService: UserService,
    private productService: ProductsService,
  ) {}

  @Roles(UserStatus.ADMIN, UserStatus.MODERATOR)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query((returns) => ShopUser)
  async user(@Args('id') id: string) {
    return this.userService.FindOneById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => ShopUser)
  async manageUserCart(
    @CtxUser() user: User,
    @Args('manageUserCartInput') manageUserCartInput: ManageUserCartInput,
  ) {
    const { productId, action, amount } = manageUserCartInput;

    const product = await this.productService.getProduct(productId);

    return this.userService.ManageUserCart(
      user._id,
      productId,
      action,
      product,
      amount,
    );
  }

  @ResolveField('cart', (returns) => [CartItem])
  async product(@Parent() user: ShopUser) {
    const products = await this.productService.getUserProducts(user.cart);

    if (products) {
      user.cart.find((product) => {
        const match = products.find((item) => product.id === item.productId);

        product.product = { ...match };
      });
    }
    return user.cart;
  }

  @Mutation((returns) => LoginType)
  async LogInUser(
    @Args('userCredentials')
    userCredentials: UserCredentials,
    @Context() context,
  ) {
    const user = await this.userService.LogInUser(userCredentials);

    if (user) {
      context.res?.cookie(
        'auth_cookie',
        { accessToken: user.accessToken, refreshToken: user.refreshToken },
        { httpOnly: true },
      );
    }

    return user;
  }

  @Mutation((returns) => ShopUser)
  createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ) {
    return this.userService.UserSignUp(createUserInput);
  }
}
