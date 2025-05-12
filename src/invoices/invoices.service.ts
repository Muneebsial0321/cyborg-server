import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { InvoiceSearchType } from './invoices.controller';
import { addDays, startOfDay } from 'date-fns';

@Injectable()
export class InvoicesService {

  constructor(private readonly db: DbService) { }

  async create(invoice: Prisma.InvoiceUncheckedCreateInput) {
    const user = await this.db.user.findFirst({ where: { id: invoice.userId } })
    if (!user) throw new NotFoundException('User Not Found');
    if (user.nextPayment! > new Date()) throw new BadRequestException('Payment Already exist');

    const nextPayment = new Date()
    nextPayment.setMonth(nextPayment.getMonth() + 1)
    await this.db.user.update({ where: { id: invoice.userId }, data: { nextPayment } })
    return this.db.invoice.create({ data: { ...invoice } })
  }

  findAll(q: InvoiceSearchType) {
    const { createdAt, invoiceType, query } = q
    console.log({
      createdAt: new Date(createdAt!),
    });

    return this.db.invoice.findMany({
      where: {
        ...(query ? { user: { name: { contains: query } } } : {}),
        ...(createdAt ? { createdAt: { gte: startOfDay(new Date(createdAt)), lt: startOfDay(addDays(new Date(createdAt), 1)) } } : {}),
        ...(invoiceType ? { invoiceType } : {}),

      },
      include: { user: true }
    })
  }

  findOne(id: string) {
    return this.db.invoice.findUnique({ where: { id } })
  }
}
