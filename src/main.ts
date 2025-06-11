import { randomUUID, webcrypto } from 'crypto';

if (!globalThis.crypto) {
  globalThis.crypto = {
    ...webcrypto,
    randomUUID,
  } as Crypto;
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
