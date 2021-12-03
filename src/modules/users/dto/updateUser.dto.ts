export class UpdateUserDto {
  email: string;
  username: string;
  image: string;
  password: string;
  orders: Array<string>;
  role: string;
}
