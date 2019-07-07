import { Logger, NestMiddleware, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger('AuthMiddleware');

  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: () => any) {
    const { authorization: bearer } = req.headers;

    if (bearer && bearer.startsWith('Bearer ')) {
      try {
        const [_, token] = bearer.split('Bearer ');

        const user = await this.authService.identify(token);
        (req as any).user = user;
      } catch (error) {
        this.logger.log(`Got invalid token. ${error.message}`);
      }
    }

    next();
  }
}
