import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateGroupDto {
    @IsNotEmpty({ message: "Required Group Name" })
     name: string;
     @IsNumber()
     @IsNotEmpty({ message: "Required CreateBy" })
     createdBy: number;
    // @IsNotEmpty({ message: "Required Created By" })
    // readonly createBy: number;
}