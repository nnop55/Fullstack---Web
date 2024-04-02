import { IsEmail, IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    fullName!: string;

    @IsString()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsInt()
    @IsIn([0, 1])
    role!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}