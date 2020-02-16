import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CityCreateDto {
    @IsNotEmpty({ message: "Required Group Name" })
    @ApiProperty()
    readonly name: string;
}
export class CityUpdateDto {
    @ApiProperty()
    readonly id:number;
    @IsNotEmpty({ message: "Required City Name" })
    @ApiProperty()
    readonly name: string;
}

export class CityListQueryDto {
    @ApiProperty({required:false})
    readonly search: string;
}