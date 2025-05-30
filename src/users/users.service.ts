import { Injectable } from '@nestjs/common';
import { } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './create-user-dto';

@Injectable()
export class UsersService {

  constructor(private readonly dbService: DbService) { }

  async getTotalUsers() {
    return this.dbService.user.count();
  }

  async getUsersPresentToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.dbService.user.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    });
  }

  async getAllAttendanceToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.dbService.attendance.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    });
  }

  async getAllMorningAttendance() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.dbService.attendance.count({
      where: {
        time: "MORNING",
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    });
  }

  async getAllEveningAttendance() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.dbService.attendance.count({
      where: {
        time: "EVENING",
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    });
  }

  async getMonthlyInvoices() {
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);

    const invoices = await this.dbService.invoice.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth
        }
      },
      include: {
        user: true
      }
    });

    const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.fee, 0);
    return { totalRevenue };
  }

  async create(user: CreateUserDto) {

    // transation
    const { monthlyInvoice, registrationInvoice, userInstance } = await this.dbService.$transaction(async (tx) => {

      // user created
      const userInstance = await tx.user.create({
        data: {
          name: user.name,
          email: user.email,
          phoneNumber: user.phone,
          cardio: user.cardio.toLocaleLowerCase() === "true",
          presonalTrainer: user.personalTrainer.toLocaleLowerCase() === "true",
          nextPayment: new Date(user.nextPayment),
          picUrl: user?.image
        }
      })

      // registration invoice
      const registrationInvoice = await tx.invoice.create({
        data: {
          fee: Number(user.registrationFee),
          userId: userInstance.id,
          invoiceType: 'REGISTRATION_FEE',
          description: "Invoice For Registration",
        }
      })

      // monthly free invoice
      const monthlyInvoice = await tx.invoice.create({
        data: {
          fee: Number(user.monthlyFee),
          userId: userInstance.id,
          invoiceType: "MONTHLY_FEE",
          description: "Invoice for Monthly payment"

        }
      })

      return {
        registrationInvoice,
        monthlyInvoice,
        userInstance
      }
    })

    return {
      ...userInstance,
      monthlyInvoice,
      registrationInvoice
    }
  }

  async findAll(
    paymentStatus: string | null,
    query: string | null
  ) {
    const data = await this.dbService
      .$queryRaw`
      SELECT * FROM (
        SELECT
        u.*,
        CASE
          WHEN EXISTS (
            SELECT 1
            FROM Attendance a
            WHERE a.userId = u.id
              AND a.createdAt >= CURDATE()
              AND a.createdAt < CURDATE() + INTERVAL 1 DAY
        )
        THEN "Present"
        ELSE "Absent"
        END AS hasAttendanceToday,

        CASE 
          WHEN u.nextPayment < CURDATE() THEN "due"
          WHEN u.nextPayment < CURDATE() + INTERVAL 7 DAY THEN "finishing"
          ELSE "paid"
        END As hasPaid      

        FROM User u
      ) AS user_with_status

      WHERE
           (${paymentStatus} IS NULL OR hasPaid = ${paymentStatus})
          AND (${query} IS NULL OR name LIKE CONCAT('%', ${query}, '%') OR email LIKE CONCAT('%', ${query}, '%'))
          
      `;

    return (data as any[]).map((e: any) => {
      return {
        ...e,
        picUrl: e.picUrl ? `${"http://localhost:5000"}/uploads/${e.picUrl}` : null
      }
    })
  }

  findOne(id: string) {
    return this.dbService.user.findUnique({ where: { id: id } })
  }

  async findAllUsersCount() {
    const usersCount = await this.dbService.user.count()
    return { usersCount }
  }

  async getDashboardData() {
    const totalUser = ""
    const totalAttendanceToday = ""
  }
}
