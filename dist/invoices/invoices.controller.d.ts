import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './create-invoice.dto';
export type InvoiceSearchType = {
    query: string | null;
    createdAt: string | null;
    invoiceType: 'MONTHLY_FEE' | 'REGISTRATION_FEE' | null;
};
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(createInvoiceDto: CreateInvoiceDto): Promise<{
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
    findAll(q: InvoiceSearchType): import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__InvoiceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fee: number;
        invoiceType: import(".prisma/client").$Enums.invoiceType;
        description: string | null;
        userId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
