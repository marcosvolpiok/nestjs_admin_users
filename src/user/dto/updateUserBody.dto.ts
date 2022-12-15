import { IsNotEmpty } from 'class-validator';
import { IsUserAlreadyExist } from '../validations/user-is-not-repeated'
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