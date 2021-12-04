import { NestFactory } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import configuration from 'config/configuration';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(configuration().port);
}
bootstrap();
MulterModule.registerAsync({
  useFactory: () => ({
    dest: './upload',
  }),
});
