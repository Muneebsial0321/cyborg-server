import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {


    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsBoolean()
    @IsNotEmpty()
    cardio: boolean;

    @IsNumber()
    @IsNotEmpty()
    registrationFee: number

    @IsNumber()
    @IsNotEmpty()
    monthlyFee: number;

    @IsOptional()
    image:any
}

