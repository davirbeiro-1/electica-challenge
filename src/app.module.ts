import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {}
}
