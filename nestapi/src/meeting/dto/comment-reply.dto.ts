import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CommentReplyDto {
    @ApiProperty()
    @IsNotEmpty({ message: "Required User Id" })
    comment: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Required User Id" })
    userId: number;
    @ApiProperty()
    @IsNotEmpty({ message: "Required Comment Id" })
    meetingCommentId: number;

}