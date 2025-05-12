import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
export declare class AttendanceService {
    private readonly db;
    constructor(db: DbService);
    create(attendance: Prisma.AttendanceUncheckedCreateInput): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Prisma.PrismaPromise<({
        User: {
            name: string;
            email: string;
            id: string;
            phoneNumber: string;
            nextPayment: Date;
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
