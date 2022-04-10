import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CtxUser = createParamDecorator((data, ctx) => {
  const response = GqlExecutionContext.create(ctx).getContext().req.user;
  return response;
});
