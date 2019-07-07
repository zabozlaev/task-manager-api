import { HttpException } from '@nestjs/common';

export const ForbiddenError = new HttpException('Forbidden.', 403);

export const UnauthorizedError = new HttpException('Unauthorized.', 401);
