import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../entities/staff.entity';

import { CreateStaffInput, StaffCredentials } from './staff.input';
import { errorCodes, errorHandler } from 'src/utils/errorHandler';
import { UserStatus } from './staff.type';
import { AuthService } from 'src/auth/auth.service';
import { AuthHelper } from 'src/auth/auth.helper';
import { User } from 'src/auth/auth.type';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private authService: AuthService,
  ) {}

  async LogInStaff(
    staffCredentials: StaffCredentials,
  ): Promise<{
    _id: string;
    accessToken: string;
    refreshToken: string;
  } | void> {
    const { username, email, password } = staffCredentials;

    const user = await this.staffRepository.findOne({ username, email });

    if (user && (await AuthHelper.validate(password, user.password))) {
      return this.authService.logInUser(user._id);
    } else {
      errorHandler('Please check your login credentials', '401');
    }
  }

  async GetLoggedIn(user: User) {
    return this.authService.getMe(user);
  }

  async FindUser(userId: string, searchField: string) {
    try {
      const userRole = await this.staffRepository.findOne({ _id: userId });
      if (userRole.role !== 'admin') throw new UnauthorizedException();
      const user = await this.staffRepository.findOne({
        where: {
          $or: [{ username: searchField }, { email: searchField }],
        },
      });

      return user;
    } catch {
      errorHandler('Something went wrong, try again later', '501');
    }
  }

  async CreateAdminAccount(): Promise<Staff> {
    const adminExist = await this.staffRepository.find({
      role: UserStatus.ADMIN,
    });

    console.log(adminExist);

    if (adminExist.length > 0)
      errorHandler(
        'Unauthorized. If problem will repeat, contact our support.',
        '401',
      );

    const admin = this.staffRepository.create({
      username: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: await AuthHelper.hash(process.env.ADMIN_PASSWORD),
      role: UserStatus.ADMIN,
    });

    try {
      return await this.staffRepository.save(admin);
    } catch (error) {
      errorCodes(error.code);
    }
  }

  async StaffSignUp(
    userId,
    createStaffInput: CreateStaffInput,
  ): Promise<Staff | void> {
    const { username, email, password, role } = createStaffInput;

    const admin = await this.staffRepository.find({ role: UserStatus.ADMIN });

    if (admin.length > 0 && role === UserStatus.ADMIN)
      errorHandler(
        'Unauthorized. If problem will repeat, contact our support.',
        '401',
      );

    const user = this.staffRepository.create({
      username,
      email,
      password: await AuthHelper.hash(password),
      createdAt: new Date(),
      role,
    });

    try {
      return await this.staffRepository.save(user);
    } catch (error) {
      errorCodes(error.code);
    }
  }
}
