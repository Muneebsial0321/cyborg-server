import { InvoicesService } from './invoices.service';
import { Prisma } from '@prisma/client';
export type InvoiceSearchType = {
    query: string | null;
    createdAt: string | null;
    invoiceType: 'MONTHLY_FEE' | 'REGISTRATION_FEE' | null;
};
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(createInvoiceDto: Prisma.InvoiceUncheckedCreateInput): Promise<{
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            phoneNumber: string;
            cardio: boolean;
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
