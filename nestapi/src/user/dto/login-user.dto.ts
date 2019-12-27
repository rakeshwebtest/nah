import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  id: number;
  updatedDate: Date;
}