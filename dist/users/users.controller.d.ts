import { UsersService } from './users.service';
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
    findAll(query: string | null, paymentStatus: "paid" | "finishing" | "due" | null): Promise<any[]>;
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
    getStats(): Promise<{
        totalUsers: number;
        usersToday: number;
        totalRevenue: number;
    }>;
    findTotalUsers(): Promise<{
        usersCount: number;
    }>;
    getDashboardData(): void;
}
