import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMeetingDto {
    @ApiProperty()
    @IsNotEmpty({ message: "Required Meeting Name" })
    title: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required Meeting Name" })
    agenda: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required CreateBy" })
    createdBy: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required groupd" })
    groupId: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required groupd" })
    cityId: string;
    @ApiProperty()
    meetingDate: string;
    @ApiProperty()
    endDate:string;
    @ApiProperty()
    location:string;
    @ApiProperty()
    startTime: string;
    endTime: string;
    imageUrl: string;
    isPublished: string;
    // @IsNotEmpty({ message: "Required Created By" })
    // readonly createBy: number;
}