import { IsNotEmpty } from 'class-validator';
import { UserExist } from '../validations/user-exists';


export class UpdateUserDTO {
  @IsNotEmpty()
  @UserExist({
    message: 'User $value is not exist',
  })
  readonly id: String;
}