import { Injectable } from '@nestjs/common';
import { } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './create-user-dto';

@Injectable()
export class UsersService {

  constructor(private readonly dbService: DbService) { }
  async create(user: CreateUserDto) {

    const nextPayment = new Date();
    nextPayment.setMonth(nextPayment.getMonth() + 1);

    // transation
    const { monthlyInvoice, registrationInvoice, userInstance } = await this.dbService.$transaction(async (tx) => {

      // user created
      const userInstance = await tx.user.create({
        data: {
          name: user.name,
          email: user.email,
          phoneNumber: user.phone,
          cardio: user.cardio,
          nextPayment
        }
      })

      // registration invoice
      const registrationInvoice = await tx.invoice.create({
        data: {
          fee: user.registrationFee,
          userId: userInstance.id,
          invoiceType: 'REGISTRATION_FEE',
          description: "Invoice For Registration",
        }
      })

      // monthly free invoice
      const monthlyInvoice = await tx.invoice.create({
        data: {
          fee: user.monthlyFee,
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

  findAll(
    paymentStatus: string | null,
    query: string | null
  ) {
    return this.dbService
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
          WHEN u.nextPayment < CURDATE() + INTERVAL 2 DAY THEN "finishing"
          ELSE "paid"
        END As hasPaid      

        FROM User u
      ) AS user_with_status

      WHERE
           (${paymentStatus} IS NULL OR hasPaid = ${paymentStatus})
           AND (${query} IS NULL OR name LIKE ${'%' + query + '%'})
           AND (${query} IS NULL OR email LIKE ${'%' + query + '%'});
          
      `;
  }

  findOne(id: string) {
    return this.dbService.user.findUnique({ where: { id: id } })
  }
}
