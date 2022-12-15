import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
@ValidatorConstraint({ name: 'userExist', async: true })
export class UserExistConstraint implements ValidatorConstraintInterface {
  constructor(
    private userService: UserService
  ) { }

  async validate(id: String) {
    if (await this.userService.getUserById(id)) {
      return true;
    } else {
      return false;
    }
  }
}

export function UserExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserExistConstraint,
    });
  };
}