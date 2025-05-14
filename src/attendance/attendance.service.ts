import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { AttendanceSearchType } from './attendance.controller';
import { addDays, startOfDay } from 'date-fns';


@Injectable()
export class AttendanceService {

  constructor(private readonly db: DbService) { }

  async create(attendance: Prisma.AttendanceUncheckedCreateInput) {
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    const tomorrowMidnight = new Date();
    tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1);
    tomorrowMidnight.setHours(0, 0, 0, 0);

    // check attendence already exit
    const oldAttendance = await this.db.attendance.findFirst({
      where: {
        userId: attendance.userId,
        createdAt: { gte: todayMidnight, lt: tomorrowMidnight }
      }
    })

    if (oldAttendance) throw new ConflictException("Attendance already exists.")

    return this.db.attendance.create({ data: attendance })
  }

  findAll(q: AttendanceSearchType) {
    return this.db.attendance.findMany({
      where: {
        ...(q.query && {
          OR: [
            { User: { name: { contains: q.query } } },
            { User: { phoneNumber: { contains: q.query } } }
          ]
        }),
        ...(q.createdAt && {
          createdAt: {
            gte: new Date(q.createdAt),
            lt: new Date(new Date(q.createdAt).setDate(new Date(q.createdAt).getDate() + 1))
          }
        }),
        ...(q.attendanceType && {
          time: q.attendanceType
        })
      },
      include: {
        User: {
          select: { email: true, name: true, id: true, phoneNumber: true, nextPayment: true }
        }
      }
    })
  }

  async findAttendanceCountWhereDateIsToday() {
    const attendanceCount = await this.db.attendance.count({
      where: {
        createdAt: { gte: startOfDay(new Date()), lt: startOfDay(addDays(new Date(), 1)) }
      }
    })
    return { attendanceCount }
  }


}
