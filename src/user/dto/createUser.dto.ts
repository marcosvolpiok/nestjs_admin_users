export class CreateUserDTO {
  readonly firstName: string;
  readonly lastName: string;
  readonly address: string;
  readonly user: string;
  password: string;
  readonly createdAt: Date;
}