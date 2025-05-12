import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './create-user-dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(image: Express.Multer.File, createUserDto: CreateUserDto): Promise<{
        monthlyInvoice: {
            id: string;
            fee: number;
            invoiceType: import(".prisma/client").$Enums.invoiceType;
            description: string | null;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        registrationInvoice: {
            id: string;
            fee: number;
            invoiceType: import(".prisma/client").$Enums.invoiceType;
            description: string | null;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        name: string;
        email: string;
        cardio: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phoneNumber: string;
        nextPayment: Date;
    }>;
    findAll(query: string | null, paymentStatus: "paid" | "finishing" | "due" | null): Prisma.PrismaPromise<unknown>;
    findOne(id: string): Prisma.Prisma__UserClient<{
        name: string;
        email: string;
        cardio: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phoneNumber: string;
        nextPayment: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
