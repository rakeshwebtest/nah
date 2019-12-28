import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
export class GroupFollowDto {
    @IsNumber()
    @IsNotEmpty({ message: "Required group id" })
    groupId: number;
    
    @IsNotEmpty({ message: "Required Created By" })
    userId: number;
    // @IsNotEmpty({ message: "Required Created By" })
    // readonly createBy: number;
}