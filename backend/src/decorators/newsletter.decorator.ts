import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const NewsletterCheck = createParamDecorator((data, ctx) => {
  const response =
    GqlExecutionContext.create(ctx).getContext().req.headers.authorization;
  return response.replace('Bearer ', '');
});
