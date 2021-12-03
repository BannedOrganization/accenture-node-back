import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { CompanyService } from './index.service';
import { CompanyResponseInterface } from './interfaces/companyResponse.interface';
import { CompaniesResponseInterface } from './interfaces/companiesResponse.interface';
import { AuthGuard } from '@app/modules/users/guards/auth.guard';
import { BackendValidationPipe } from '@app/shared/pipes/backend.validation.pipe';
import { GetCompaniesDto } from './dto/getCompanies.dto';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('companies')
  @UsePipes(new BackendValidationPipe())
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyResponseInterface> {
    const user = await this.companyService.createCompany(createCompanyDto);
    return this.companyService.buildCompanyResponse(user);
  }

  @Get('companies')
  @UseGuards(AuthGuard)
  async getCompanies(
    @Query() data: GetCompaniesDto,
  ): Promise<CompaniesResponseInterface> {
    const result = await this.companyService.getCompanies(data);
    return result;
  }

  @Get('companies/:id')
  @UseGuards(AuthGuard)
  async getCompany(@Param() params): Promise<CompanyResponseInterface> {
    const result = await this.companyService.findById(params.id);
    return this.companyService.buildCompanyResponse(result);
  }

  @Put('companies/:id')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Param() params: { id: string },
  ): Promise<CompanyResponseInterface> {
    const result = await this.companyService.updateCompany(
      params.id,
      updateCompanyDto,
    );
    return this.companyService.buildCompanyResponse(result);
  }
}
