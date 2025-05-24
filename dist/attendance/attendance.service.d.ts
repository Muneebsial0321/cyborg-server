import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { AttendanceSearchType } from './attendance.controller';
export declare class AttendanceService {
    private readonly db;
    constructor(db: DbService);
    create(attendance: Prisma.AttendanceUncheckedCreateInput): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        time: import(".prisma/client").$Enums.timeType | null;
    }>;
    findAll(q: AttendanceSearchType): Prisma.PrismaPromise<({
        User: {
            name: string;
            email: string | null;
            nextPayment: Date;
            id: string;
            phoneNumber: string;
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        time: import(".prisma/client").$Enums.timeType | null;
    })[]>;
    findAttendanceCountWhereDateIsToday(): Promise<{
        attendanceCount: number;
    }>;
}
