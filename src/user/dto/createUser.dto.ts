import { IsNotEmpty } from 'class-validator';
import { IsUserAlreadyExist } from '../validations/user-is-not-repeated'
export class CreateUserDTO {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  @IsUserAlreadyExist({
    message: 'User $value already exists. Choose another name.',
  })
  readonly user: string;

  @IsNotEmpty()
  password: string;

  readonly createdAt: Date;
}