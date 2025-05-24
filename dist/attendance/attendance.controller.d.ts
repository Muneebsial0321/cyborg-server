import { AttendanceService } from './attendance.service';
import { Prisma } from '@prisma/client';
export type AttendanceSearchType = {
    query: string | null;
    createdAt: string | null;
    attendanceType: 'MORNING' | 'EVENING' | null;
};
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(createAttendanceDto: Prisma.AttendanceUncheckedCreateInput): Promise<{
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
    findTodaysAttendance(): Promise<{
        attendanceCount: number;
    }>;
}
