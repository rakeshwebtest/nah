import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty({ message: "Select Type of noer" })
    readonly typeOfNoer: string;
    @IsNotEmpty()
    readonly email: string;
    @IsNotEmpty()
    readonly id: number;
    @IsNotEmpty()
    readonly country: string;
    readonly groups: any[];
    readonly newGroupName:string;
}