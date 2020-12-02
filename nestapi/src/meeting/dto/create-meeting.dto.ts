import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  Validate,
  ValidateIf,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment-timezone';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomDateCheck implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const meetingDate = moment(text).format('YYYY-MM-DD');
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    // currentDate.setHours(0, 0, 0, 0);
    const meetingReqData: any = args.object;

    const startTime = moment(meetingReqData.startTime).format('HH:mm:ss');

    const meetingDateTime = moment(new Date(meetingDate + ' ' + startTime)).format('YYYY-MM-DD HH:mm:ss');
    meetingReqData.meetingDate = meetingDateTime;
    // console.log(
    //     meetingDateTime >= currentDate,
    //   meetingDateTime,
    //   currentDate
    // );
    return meetingDateTime >= currentDate; //myDate >= currentDate; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Check Date';
  }
}
export class CreateMeetingDto {
  @ApiProperty()
  id: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
  @ApiProperty()
  @IsNotEmpty({ message: 'Required Meeting Information required' })
  title: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Required Meeting Information required' })
  agenda: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Required Contact Email' })
  contactEmail: string;
  @ApiProperty()
  // @IsNotEmpty({ message: "Required Contact Mobile" })
  contactMobile: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Required CreateBy' })
  createdBy: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Required groupd' })
  groupId: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Required city' })
  cityId: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Required meetingDate' })
  @Validate(CustomDateCheck, {
    message: 'Please Choose Valid Date',
  })
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
  isPublished: any;
  // @IsNotEmpty({ message: "Required Created By" })
  // readonly createBy: number;
}
export class MeetingQueryDao {
  @ApiProperty({ required: false })
  meetingId: number;

  @ApiProperty({ required: false })
  groupId: number;

  @ApiProperty({ required: false, enum: ['upcoming', 'my-meeting'] })
  type: string;

  @ApiProperty({ required: false })
  search: string;

  @ApiProperty({ required: false })
  userId: string;

  @ApiProperty({ required: false, default: 500 })
  take: number;

  @ApiProperty({ required: false, default: 0 })
  skip: number;
}

export class GetReportDto {
  @ApiProperty({ required: false })
  search: string;
}
