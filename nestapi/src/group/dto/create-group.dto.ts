import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateGroupDto {
    @ApiProperty()
    @IsNotEmpty({ message: "Required Group Name" })
    name: string;
    // @IsNotEmpty({ message: "Required Created By" })
    // readonly createBy: number;
}