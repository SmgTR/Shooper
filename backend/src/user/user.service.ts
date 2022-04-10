import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '../entities/user.entity';
import { errorCodes } from 'src/utils/errorHandler';

import { CreateUserInput } from './user.input';
import { errorHandler } from 'src/utils/errorHandler';

import { UserCredentials } from './user.input';

import { AuthHelper } from 'src/auth/auth.helper';

import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';

import { Products } from 'src/entities/products.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  async FindOneById(userId) {
    const user = await this.userRepository.findOne(userId);

    return user;
  }

  async FindUsers(findBy) {
    const users = await this.userRepository.find({ where: findBy });

    return users;
  }

  async LogInUser(userCredentials: UserCredentials): Promise<{
    _id: string;
    accessToken: string;
    refreshToken: string;
  } | void> {
    const { email, password } = userCredentials;

    const user = await this.userRepository.findOne({ email });

    if (user && (await AuthHelper.validate(password, user.password))) {
      return this.authService.logInUser(user._id);
    } else {
      errorHandler('Please check your login credentials', '401');
    }
  }

  async UserNewsletter(email: string, action: string) {
    const user = await this.userRepository.find({ where: { email: email } });

    if (user.length > 0) {
      const actionValue = action === 'ADD' ? true : false;
      user[0].newsletter = actionValue;
      this.userRepository.save(user);
    }
    return user;
  }

  async ManageUserCart(
    userId: string,
    productId: string,
    symbol: string,
    product: Products,
    amount: number,
  ): Promise<Users> {
    const user = await this.userRepository.findOne(userId);

    let productInCart;

    const productAmount = amount ? amount : 1;

    if (user.cart.length > 0) {
      productInCart = user.cart.find((inCart) => inCart.id === productId);
    }
    if (symbol === 'ADD') {
      productInCart
        ? (productInCart.quantity += productAmount)
        : user.cart.push({ id: productId, quantity: productAmount });

      if (productInCart && productInCart.quantity > product.quantity) {
        productInCart.quantity = product.quantity;

        this.userRepository.save(user);
        errorHandler(
          `Available amount of product is ${product.quantity}`,
          '406',
        );
      }
    }
    if (symbol === 'REMOVE' && productInCart) {
      productInCart.quantity > 1
        ? (productInCart.quantity -= productAmount)
        : user.cart.find((product, index) => {
            if (productId === product.id) {
              return user.cart.splice(index, 1);
            }
          });

      if (productInCart.quantity - amount <= 0)
        user.cart.find((product, index) => {
          if (productId === product.id) {
            return user.cart.splice(index, 1);
          }
        });
    } else if (symbol === 'REMOVE' && !productInCart) {
      errorHandler('Product does not exist in user cart', '404');
    }

    this.userRepository.save(user);

    return user;
  }

  async UserSignUp(createUserInput: CreateUserInput): Promise<Users | void> {
    const { name, email, password, newsletter, lastName } = createUserInput;

    const newsletterValue = !newsletter ? false : newsletter;
    const user = this.userRepository.create({
      name,
      email,
      lastName,
      password: await AuthHelper.hash(password),
      newsletter: newsletterValue,
      createdAt: new Date(),
      cart: [],
    });

    try {
      const newUser = await this.userRepository.save(user);

      if (newUser) {
        this.mailService.SendWelcomeMail(email, name);
      }

      return newUser;
    } catch (error) {
      errorCodes(error.code);
    }
  }
}
