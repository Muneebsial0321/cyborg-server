import { IsDate, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { invoiceType } from "@prisma/client";

export class CreateInvoiceDto {
    @IsInt()
    fee: number;
  
    @IsEnum(invoiceType)
    @IsOptional()
    invoiceType?: invoiceType = invoiceType.MONTHLY_FEE;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsString()
    userId: string;

    @IsString()
    nextPayment: string;
  }