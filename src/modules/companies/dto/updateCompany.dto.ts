import { IsNotEmpty } from 'class-validator';
type status = 'active' | 'inactive';

export class UpdateCompanyDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly status: status;
}
