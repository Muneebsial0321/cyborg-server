"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
let UsersService = class UsersService {
    constructor(dbService) {
        this.dbService = dbService;
    }
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
    async create(user) {
        const { monthlyInvoice, registrationInvoice, userInstance } = await this.dbService.$transaction(async (tx) => {
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
            });
            const registrationInvoice = await tx.invoice.create({
                data: {
                    fee: Number(user.registrationFee),
                    userId: userInstance.id,
                    invoiceType: 'REGISTRATION_FEE',
                    description: "Invoice For Registration",
                }
            });
            const monthlyInvoice = await tx.invoice.create({
                data: {
                    fee: Number(user.monthlyFee),
                    userId: userInstance.id,
                    invoiceType: "MONTHLY_FEE",
                    description: "Invoice for Monthly payment"
                }
            });
            return {
                registrationInvoice,
                monthlyInvoice,
                userInstance
            };
        });
        return {
            ...userInstance,
            monthlyInvoice,
            registrationInvoice
        };
    }
    async findAll(paymentStatus, query) {
        const data = await this.dbService
            .$queryRaw `
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
          WHEN u.nextPayment < CURDATE() + INTERVAL 5 DAY THEN "finishing"
          ELSE "paid"
        END As hasPaid      

        FROM User u
      ) AS user_with_status

      WHERE
           (${paymentStatus} IS NULL OR hasPaid = ${paymentStatus})
          AND (${query} IS NULL OR name LIKE CONCAT('%', ${query}, '%') OR email LIKE CONCAT('%', ${query}, '%'))
          
      `;
        return data.map((e) => {
            return {
                ...e,
                picUrl: e.picUrl ? `${"http://localhost:5000"}/uploads/${e.picUrl}` : null
            };
        });
    }
    findOne(id) {
        return this.dbService.user.findUnique({ where: { id: id } });
    }
    async findAllUsersCount() {
        const usersCount = await this.dbService.user.count();
        return { usersCount };
    }
    async getDashboardData() {
        const totalUser = "";
        const totalAttendanceToday = "";
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], UsersService);
//# sourceMappingURL=users.service.js.map