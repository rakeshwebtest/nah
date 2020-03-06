import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ReportDto {
    @ApiProperty()
    @IsNotEmpty({ message: "Required User Id" })
    comment: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required User Id" })
    userId: number;
    @ApiProperty()
    @IsNotEmpty({ message: "Required Meeting Id" })
    meetingId: number;

    @ApiProperty()
    @IsNotEmpty({ message: "Required Category Id" })
    categoryId: number;

}