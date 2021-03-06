import { ExpressRequestInterface } from '@app/types/ExpressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { UserService } from '../index.service';
import { verify } from 'jsonwebtoken';
import configuration from 'config/configuration';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode: any = verify(token, configuration().jwt_secret);
      const user = await this.userService.findById(decode._id);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
