import { SetMetadata } from '@nestjs/common';
import { UserStatus } from 'src/staff/staff.type';

export const Roles = (...roles: UserStatus[]) => SetMetadata('roles', roles);
