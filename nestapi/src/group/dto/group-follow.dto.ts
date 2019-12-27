import { IsNotEmpty, IsNumber } from 'class-validator';
export class GroupFollowDto {
    @IsNumber()
    @IsNotEmpty({ message: "Required group id" })
    groupId: number;

    @IsNumber()
    @IsNotEmpty({ message: "Required Created By" })
    userId: number;
    // @IsNotEmpty({ message: "Required Created By" })
    // readonly createBy: number;
}