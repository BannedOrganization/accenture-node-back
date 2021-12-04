import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from '@app/modules/users/guards/auth.guard';
import { CompanyController } from './index.controller';
import { CompanyService } from './index.service';
import { Company, CompanySchema } from './schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, AuthGuard],
  exports: [CompanyService],
})
export class CompanyModule {}
