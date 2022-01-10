import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class PartsDto {
    id: number;
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNumber()
    quantity: number;
    @ApiProperty()
    @IsNumber()
    price: number;
    @ApiProperty()
    @IsString()
    company: string;
}