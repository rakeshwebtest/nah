import { IsNotEmpty, IsNumber, IsDate, Validate, ValidateIf, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { timer } from 'rxjs';
import { strict } from 'assert';

@ValidatorConstraint({ name: "customText", async: false })
export class CustomDateCheck implements ValidatorConstraintInterface {

    validate(text: string, args: ValidationArguments) {

        const myDate = new Date(text);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return myDate >= currentDate; // for async validations you must return a Promise<boolean> here
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return "Check Date";
    }

}
class Video {
    @ApiProperty()
    @IsNotEmpty({ message: "Video Path Required" })
    videoPath: string;
}
export class SavePostDto {

    @ApiProperty()
    id: string;
    @ApiProperty({ type: 'string', format: 'binary' })
    photos: any[]
    @ApiProperty()
    @IsNotEmpty({ message: "Title name Required" })
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Topic name Required" })
    topicId: string;
    @ApiProperty()
    isPublished: number;

    @ApiProperty()
    @ValidateNested()
    videos: Video[];
    
    // @IsNotEmpty({ message: "Required Created By" })
    // readonly createBy: number;
}
export class PostQueryDao {
    @ApiProperty({ required: false })
    postId: number;

    @ApiProperty({ required: false, enum: ["all", "my-posts", "bookmarks"] })
    type: string;

    @ApiProperty({ required: false, default: 500 })
    take: number;

    @ApiProperty({ required: false, default: 0 })
    skip: number;

    @ApiProperty({ required: false, default: 0 })
    userId: number;

    

}

export class GetReportDto {
    @ApiProperty({ required: false })
    search: string;
}

export class bookmarkDto {

    @ApiProperty()
    userId: number;
    @ApiProperty()
    postId: number;
}

export class BookmarkLikeAndDislikeParamDto {
    @ApiProperty({ required: false, enum: ["bookmark", "like", "dislike"] })
    type: string;
    @ApiProperty()
    postId: number;

}
