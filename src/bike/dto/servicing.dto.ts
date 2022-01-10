import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { PartsDto } from "./parts.dto";


export class ServicingDto {
    @ApiProperty()
    billAmount: number;
    billPicPath: string;
    @ApiProperty()
    parts: PartsDto[];
}