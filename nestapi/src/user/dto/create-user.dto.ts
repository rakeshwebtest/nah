import { IsNotEmpty } from 'class-validator';
import { GroupFollowDto } from 'src/group/dto/group-follow.dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @IsNotEmpty({ message: "Select Type of noer" })
    readonly typeOfNoer: string;
    @IsNotEmpty()
    readonly email: string;
    @IsNotEmpty()
    readonly id: number;
    @IsNotEmpty()
    readonly cityId: number;
    readonly followGroups: GroupFollowDto[];
    readonly newGroupName: string;
    updatedDate: Date;
}
export class UserLIstQuery {
    @ApiProperty({ required: false })
    search: string;
}