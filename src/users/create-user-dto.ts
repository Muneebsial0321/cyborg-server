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

    @IsString()
    @IsNotEmpty()
    nextPayment: string;

    @IsString()
    @IsNotEmpty()
    cardio: string;

    @IsString()
    @IsNotEmpty()
    personalTrainer: string;

    @IsString()
    @IsNotEmpty()
    registrationFee: string

    @IsString()
    @IsNotEmpty()
    monthlyFee: string;

    @IsOptional()
    image:any
}

