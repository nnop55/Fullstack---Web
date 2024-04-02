import { IsNotEmpty, IsString } from "class-validator";

export class CarDto {
    @IsNotEmpty()
    @IsString()
    type!: string;

    @IsNotEmpty()
    @IsString()
    mark!: string;

    @IsNotEmpty()
    @IsString()
    licenseNumber!: string;
}