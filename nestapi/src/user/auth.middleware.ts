import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { APP_CONFIG } from '../config';
import { UserService } from './user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    try {
      if (authHeaders && (authHeaders as string).split(' ')[1]) {
        const token = (authHeaders as string).split(' ')[1];
        const userId: any = jwt.verify(token, APP_CONFIG.SECRET);
        const user = await this.userService.findById(userId);

        if (!user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }
        if (user.status === 'block')
          throw new HttpException({ message: 'Blocked User', success: false }, HttpStatus.FORBIDDEN);

        // req.userInfo = {};
        req['sessionUser'] = user;
        next();

      } else {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }

  }
}
