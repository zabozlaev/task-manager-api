import { Logger } from '@nestjs/common';

export class CommonLogger extends Logger {
  error(message: string, trace: string) {
    super.error(message, trace);
  }
}
