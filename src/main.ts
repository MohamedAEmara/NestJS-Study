import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  // To use a global-scoped filter, we can use .useGlobalFilter()

  // To use RolesGuard globally on all controllers.
  app.useGlobalGuards(new RolesGuard());
  await app.listen(3000);
}
bootstrap();
