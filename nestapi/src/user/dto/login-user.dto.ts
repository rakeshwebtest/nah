import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {

  @IsNotEmpty()
  readonly email: string;
  id: string;
}