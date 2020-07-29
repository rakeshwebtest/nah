import { ApiProperty } from "@nestjs/swagger";

export class FcmSendDto {

    @ApiProperty()
    fcmToken: string;
}