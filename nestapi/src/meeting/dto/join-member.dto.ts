import { IsNotEmpty, IsNumber } from 'class-validator';
export class JoinMeetingDto {
    @IsNotEmpty({ message: "Required User Id" })
    userId: number;

    @IsNotEmpty({ message: "Required Meeting Id" })
    meetingId: number;

}