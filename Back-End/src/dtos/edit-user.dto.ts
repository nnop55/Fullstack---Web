import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EditUserDto {
    @IsString()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    fullName!: string;
}