import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { InvoiceSearchType } from './invoices.controller';
export declare class InvoicesService {
    private readonly db;
    constructor(db: DbService);
    create(invoice: Prisma.InvoiceUncheckedCreateInput): Promise<{
        id: string;
        fee: number;
        invoiceType: import(".prisma/client").$Enums.invoiceType;
        description: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(q: InvoiceSearchType): Prisma.PrismaPromise<({
        user: {
            name: string;
            email: string | null;
            cardio: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            phoneNumber: string;
            nextPayment: Date;
        };
    } & {
        id: string;
        fee: number;
        invoiceType: import(".prisma/client").$Enums.invoiceType;
        description: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Prisma.Prisma__InvoiceClient<{
        id: string;
        fee: number;
        invoiceType: import(".prisma/client").$Enums.invoiceType;
        description: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
