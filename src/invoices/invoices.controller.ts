import { Controller, Get, Post, Body, Param, Query, } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Prisma } from '@prisma/client';


export type InvoiceSearchType = {
  query: string | null;
  createdAt: string | null;
  // nextPayment: string | null;
  invoiceType: 'MONTHLY_FEE' |  'REGISTRATION_FEE' | null;
}
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) { }

  @Post()
  create(@Body() createInvoiceDto: Prisma.InvoiceUncheckedCreateInput) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  findAll(
    @Query() q: InvoiceSearchType
  ) {
    console.log({ q });

    return this.invoicesService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

}
