import { IsNotEmpty } from 'class-validator';
export class GroupFollowDto {

    groupId: number;
    userId: number;
    // @IsNotEmpty({ message: "Required Created By" })
    // readonly createBy: number;
}