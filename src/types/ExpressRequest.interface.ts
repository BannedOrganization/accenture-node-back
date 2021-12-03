import { Company } from '@app/modules/companies/schemas/company.schema';
import { User } from '@app/modules/users/schemas/user.schema';
import { Request } from 'express';

export interface ExpressRequestInterface extends Request {
  user?: User;
}

export interface ExpressRequestCompanyInterface extends Request {
  company?: Company;
}
