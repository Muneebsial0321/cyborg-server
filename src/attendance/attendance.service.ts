import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';


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
        createdAt: { gte: todayMidnight, lt:tomorrowMidnight }
      }
    })

    if(oldAttendance) throw new ConflictException("Attendance already exists.")

    return this.db.attendance.create({ data: attendance })
  }

  findAll() {
    return this.db.attendance.findMany({include:{User:{select:{email:true,name:true,id:true,phoneNumber:true,nextPayment:true}}}})
  }


}
