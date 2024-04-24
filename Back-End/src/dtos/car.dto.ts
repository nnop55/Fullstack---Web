import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { CarMakes, CarModels } from "../utils/car-enum";
import { IsValidModel } from "../utils/custom-validator";

export class CarDto {
    @IsNotEmpty()
    @IsString()
    type!: string;

    @IsNotEmpty()
    @IsIn(Object.values(CarMakes))
    mark!: string;

    @IsNotEmpty()
    @IsValidModel()
    model!: string;

    @IsNotEmpty()
    @IsString()
    licenseNumber!: string;

    constructor(mark: string) {
        this.mark = mark
    }
}