import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

let app: any = null;

export default async function handler(req: any, res: any) {
  if (!app) {
    app = await NestFactory.create(AppModule);
    await app.init();
  }

  return app.getHttpAdapter().getInstance()(req, res);
}
