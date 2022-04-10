import { ConflictException } from '@nestjs/common';
import { ApolloError } from 'apollo-server-errors';

export const errorHandler = (msg: string, code: string): never => {
  throw new ApolloError(msg, code);
};

export const errorCodes = (code: number) => {
  switch (code) {
    case (code = 11000):
      errorHandler('User already exist, try to log in.', '409');
  }
};
