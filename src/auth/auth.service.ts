import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register';
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { LoginDto } from './dtos/login';
import { UnauthorizedError } from 'src/task/errors';
import { get } from 'config';
import { TokenData } from './interfaces/token.data';

const { secret, expiresIn } = get('jwt');

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signin({ email, password }: LoginDto) {
    const userFound = await this.userService.findOne({
      where: {
        email,
      },
    });

    if (!userFound) {
      throw UnauthorizedError;
    }

    const isValid = await compare(password, userFound.password);

    if (!isValid) {
      throw UnauthorizedError;
    }

    return sign(
      {
        id: userFound.id,
      },
      secret,
      {
        expiresIn,
      },
    );
  }

  identify(token: string) {
    return new Promise((resolve, reject) => {
      verify(
        token,
        secret,
        {
          ignoreExpiration: false,
        },
        (err, data: TokenData) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  async signup({ email, name, password }: RegisterDto) {
    const userWithSuchEmailFound = await this.userService.findOne({
      where: {
        email,
      },
    });

    if (userWithSuchEmailFound) {
      throw new HttpException('This email is already in use.', 400);
    }

    const hashedPassword = await hash(password, 10);

    await this.userService.createUser({
      password: hashedPassword,
      email,
      name,
    });
  }
}
