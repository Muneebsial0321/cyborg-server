import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './create-user-dto';
export declare class UsersService {
    private readonly dbService;
    constructor(dbService: DbService);
    getTotalUsers(): Promise<number>;
    getUsersPresentToday(): Promise<number>;
    getMonthlyInvoices(): Promise<{
        totalRevenue: number;
    }>;
    create(user: CreateUserDto): Promise<{
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
        email: string | null;
        nextPayment: Date;
        cardio: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phoneNumber: string;
        presonalTrainer: boolean;
        picUrl: string | null;
    }>;
    findAll(paymentStatus: string | null, query: string | null): Promise<any[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        email: string | null;
        nextPayment: Date;
        cardio: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phoneNumber: string;
        presonalTrainer: boolean;
        picUrl: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAllUsersCount(): Promise<{
        usersCount: number;
    }>;
    getDashboardData(): Promise<void>;
}
