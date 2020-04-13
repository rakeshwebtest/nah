import { IsNotEmpty, MinLength, Max, Min, Length, MaxLength } from 'class-validator';
import { GroupFollowDto } from 'src/group/dto/group-follow.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CityEntity } from 'src/city/city.entity';
export class CreateUserDto {
    @IsNotEmpty({ message: "Select Type of noer" })
    readonly typeOfNoer: string;
    @IsNotEmpty()
    readonly email: string;
    @IsNotEmpty()
    readonly id: number;
    @IsNotEmpty()
    readonly city: CityEntity;
    readonly followGroups: GroupFollowDto[];
    readonly newGroupName: string;
    updatedDate: Date;
}
export class UserLIstQuery {
    @ApiProperty({ required: false })
    search: string;
    @ApiProperty({ required: false, enum: ["active", "block"] })
    status: string;
    @ApiProperty({ required: false, name: 'take', default: 1000 })
    take: number;
    @ApiProperty({ required: false, name: 'skip', default: 0 })
    skip: number;

}
export class ChangePassword {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(12)
    password: string;
}