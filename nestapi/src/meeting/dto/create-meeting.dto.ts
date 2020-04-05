import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { timer } from 'rxjs';
import { strict } from 'assert';
export class CreateMeetingDto {

    @ApiProperty()
    id: string;
    @ApiProperty({ type: 'string', format: 'binary' })
    image: any;
    @ApiProperty()
    @IsNotEmpty({ message: "Required Meeting Information required" })
    title: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required Meeting Information required" })
    agenda: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required Contact Email" })
    contactEmail: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required Contact Mobile" })
    contactMobile: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required CreateBy" })
    createdBy: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required groupd" })
    groupId: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required city" })
    cityId: string;
    @ApiProperty()
    meetingDate: string;
    @ApiProperty()
    endDate: string;
    @ApiProperty()
    location: string;
    @ApiProperty()
    startTime: string;
    @ApiProperty()
    endTime: string;
    imageUrl: string;
    @ApiProperty()
    isPublished: string;
    // @IsNotEmpty({ message: "Required Created By" })
    // readonly createBy: number;
}
export class MeetingQueryDao {
    @ApiProperty({ required: false })
    meetingId: number;

    @ApiProperty({ required: false })
    groupId: number;

    @ApiProperty({ required: false, enum: ["upcoming", "my-meeting"] })
    type: string;

    @ApiProperty({ required: false })
    search: string;

    @ApiProperty({ required: false, default: 500 })
    take: number;

    @ApiProperty({ required: false, default: 0 })
    skip: number;

}

export class GetReportDto {
    @ApiProperty({ required: false })
    search: string;
}