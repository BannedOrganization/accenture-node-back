import { ExpressRequestCompanyInterface } from '@app/types/ExpressRequest.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Company = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<ExpressRequestCompanyInterface>();

    if (!request.company) {
      return null;
    }

    if (data) {
      return request.company[data];
    }

    return request.company;
  },
);
