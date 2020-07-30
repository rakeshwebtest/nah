import { ApiProperty } from "@nestjs/swagger";

export class FcmSendDto {

    @ApiProperty()
    fcmToken: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    body: string;
    @ApiProperty()
    icon: string;
    @ApiProperty()
    color: string;
    @ApiProperty()
    sound: string;
}