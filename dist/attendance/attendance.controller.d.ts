import { AttendanceService } from './attendance.service';
import { Prisma } from '@prisma/client';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(createAttendanceDto: Prisma.AttendanceUncheckedCreateInput): Promise<{
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
