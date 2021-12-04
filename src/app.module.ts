import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'config/configuration';
import { ConfigModule } from '@nestjs/config';
import { RecognitorsModule } from './modules/recognitors/index.module';
import { UserModule } from './modules/users/index.module';
import { CompanyModule } from './modules/companies/index.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: configuration().database.host,
      }),
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    RecognitorsModule,
    UserModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
