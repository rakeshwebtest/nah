import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { AgendaTopicsEntity } from "../agenda-topics.entity";
import { UserEntity } from "src/user/user.entity";

class User {
    @ApiProperty()
    @IsNotEmpty({ message: "User required" })
    id: number;
}
class Topic {
    @ApiProperty()
    @IsNotEmpty({ message: "Topic Name Required" })
    name: string;
}
export class CreateAgendaDto {
    @ApiProperty()
    @IsNotEmpty({ message: "Required Agenda Title" })
    title: string;

    @ApiProperty()
    @ValidateNested()
    createdBy: User;
    
    @ApiProperty()
    @ValidateNested()
    topics:Topic[]
}


export class GetAgendasDto {
    @ApiProperty({ required: false })
    agendaId: number;
}
