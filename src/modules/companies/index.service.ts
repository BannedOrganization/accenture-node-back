import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { UpdateUserDto } from '../users/dto/updateUser.dto';
import { CompanyResponseInterface } from './interfaces/companyResponse.interface';
import { GetCompaniesDto } from './dto/getCompanies.dto';
import { CompaniesResponseInterface } from './interfaces/companiesResponse.interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const insertData: any = { ...createCompanyDto };

    const companyExist = await this.companyModel.countDocuments({
      $or: [{ name: insertData.name }],
    });

    if (companyExist) {
      throw new HttpException(
        'Company name is taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    insertData._id = new Types.ObjectId();
    const newCompany = new this.companyModel(insertData);
    return (await newCompany.save()).toObject();
  }

  async updateCompany(
    companyId: string | Types.ObjectId,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    if (!updateCompanyDto && !companyId) {
      throw new HttpException(
        'CompanyId or insertData not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const company = await this.companyModel.findById(
      new Types.ObjectId(companyId),
    );

    if (!company) {
      throw new HttpException(
        'Company not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    for (const key in updateCompanyDto) {
      company[key] = UpdateUserDto[key];
    }

    const result = await company.save();
    return result.toObject();
  }

  buildCompanyResponse(company: Company): CompanyResponseInterface {
    return {
      company: {
        ...company,
      },
    };
  }

  async findById(id: string | Types.ObjectId): Promise<Company> {
    const company = await this.companyModel.findById(new Types.ObjectId(id));
    if (!company) {
      throw new HttpException(
        'Company not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return company.toObject();
  }

  async getCompanies(
    getCompaniesDto: GetCompaniesDto,
  ): Promise<CompaniesResponseInterface> {
    const { limit, offset, name, status } = getCompaniesDto;
    const filter: { name: string; status: string } = {
      name: name || `New company`,
      status: status || 'inactive',
    };

    const countOfCompanies = await this.companyModel.countDocuments(filter);

    const companies = await this.companyModel
      .find(filter)
      .skip(offset)
      .limit(limit);

    return {
      count: countOfCompanies,
      hasMore: companies.length + offset <= countOfCompanies,
      results: companies,
    };
  }
}
