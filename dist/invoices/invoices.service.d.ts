import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { InvoiceSearchType } from './invoices.controller';
import { CreateInvoiceDto } from './create-invoice.dto';
export declare class InvoicesService {
    private readonly db;
    constructor(db: DbService);
    create(invoice: CreateInvoiceDto): Promise<{
        userInstance: {
            name: string;
            id: string;
            email: string | null;
            phoneNumber: string;
            cardio: boolean;
            presonalTrainer: boolean;
            createdAt: Date;
            updatedAt: Date;
            nextPayment: Date;
            picUrl: string | null;
        };
        invoiceInstance: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fee: number;
            invoiceType: import(".prisma/client").$Enums.invoiceType;
            description: string | null;
            userId: string;
        };
    }>;
    findAll(q: InvoiceSearchType): Prisma.PrismaPromise<({
        user: {
            name: string;
            id: string;
            email: string | null;
            phoneNumber: string;
            cardio: boolean;
            presonalTrainer: boolean;
            createdAt: Date;
            updatedAt: Date;
            nextPayment: Date;
            picUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fee: number;
        invoiceType: import(".prisma/client").$Enums.invoiceType;
        description: string | null;
        userId: string;
    })[]>;
    findOne(id: string): Prisma.Prisma__InvoiceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fee: number;
        invoiceType: import(".prisma/client").$Enums.invoiceType;
        description: string | null;
        userId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
