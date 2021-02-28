import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  //@IsEmail()
  readonly email: string;
  @ApiProperty({ enum: ["google", "login"], default: 'google' })
  readonly provider: string;
  @ApiProperty({ description: "if provider is login, this field is required" })
  readonly password: string;
  id: number;
  updatedDate: Date;
  fcmToken: string;
}

export class FollowDto {
  @ApiProperty()
  @IsNotEmpty()
  followingId: Number;
}

export class ProfileBlockDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: Number;
}