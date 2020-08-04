
import * as jwt from 'jsonwebtoken';
import { APP_CONFIG } from 'src/config';

export class BaseController {

  constructor() {}

  protected getUserIdFromToken(authorization) {
    if (!authorization) return null;

    const token = authorization.split(' ')[1];
    const decoded: any = jwt.verify(token, APP_CONFIG.SECRET);
    return decoded.id;
  }
}