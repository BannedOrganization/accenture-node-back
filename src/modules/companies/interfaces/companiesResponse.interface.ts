import { Company } from '@app/modules/companies/schemas/company.schema';

export interface CompaniesResponseInterface {
  count: number;
  hasMore: boolean;
  results: Array<Company>;
}
