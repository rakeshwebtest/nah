import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty({ message: "Select Type of noer" })
    readonly type_of_noer: string;
    @IsNotEmpty()
    readonly email: string;
    @IsNotEmpty()
    readonly id: number;
    @IsNotEmpty()
    readonly country: string;
    readonly groups: any[];
}