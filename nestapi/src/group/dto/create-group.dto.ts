import { IsNotEmpty } from 'class-validator';
export class CreateGroupDto {
    @IsNotEmpty({ message: "Required Group Name" })
     name: string;
     createBy: number;
    // @IsNotEmpty({ message: "Required Created By" })
    // readonly createBy: number;
}