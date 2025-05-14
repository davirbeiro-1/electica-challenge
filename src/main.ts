import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { customValidationPipe } from './common/exceptions/validation.pipe';
import { AppModule } from './app.module';
import { setupSwagger } from './common/providers/swagger.provider';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(customValidationPipe);
  setupSwagger(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
