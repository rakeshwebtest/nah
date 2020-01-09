import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateMeetingDto {
    @IsNotEmpty({ message: "Required Meeting Name" })
    title: string;

    @IsNotEmpty({ message: "Required Meeting Name" })
    agenda: string;

    @IsNotEmpty({ message: "Required CreateBy" })
    createdBy: string;

    @IsNotEmpty({ message: "Required groupd" })
    groupId: string;

    meetingDate: string;
    startTime: string;
    endTime: string;
    imageUrl: string;
    // @IsNotEmpty({ message: "Required Created By" })
    // readonly createBy: number;
}