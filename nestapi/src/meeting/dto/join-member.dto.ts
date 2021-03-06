import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class JoinMeetingDto {
    @ApiProperty()
    @IsNotEmpty({ message: "Required User Id" })
    userId: number;

    @ApiProperty()
    @IsNotEmpty({ message: "Required Meeting Id" })
    meetingId: number;

}