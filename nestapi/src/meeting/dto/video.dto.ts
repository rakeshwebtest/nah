import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class VideoDto {
    @ApiProperty()
    @IsNotEmpty({ message: "Required Video Path" })
    videoPath: string;

    @ApiProperty()
    @IsNotEmpty({ message: "Required Meeting Id" })
    meetingId: number;

}