import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { customValidationPipe } from './common/exceptions/validation.pipe';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(customValidationPipe);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
