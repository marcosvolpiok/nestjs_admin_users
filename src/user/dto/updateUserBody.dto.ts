import { IsNotEmpty } from 'class-validator';
export class UpdateUserBodyDTO {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly user: string;

  @IsNotEmpty()
  password: string;

  readonly createdAt: Date;
}