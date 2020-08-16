import { ApiProperty } from "@nestjs/swagger";

export class ImageResizeOptionsDto {
    @ApiProperty()
    w: any;
    @ApiProperty()
    h: any;
    @ApiProperty({ enum: ["cover", "contain", "fill", "inside ", "outside"] })
    fit: string;
}