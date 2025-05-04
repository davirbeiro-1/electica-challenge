import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

@Module({
  imports: [
    // Enviroment Config
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {}
}
