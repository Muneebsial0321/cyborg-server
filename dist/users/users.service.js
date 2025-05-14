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
    async create(user) {
        const nextPayment = new Date();
        nextPayment.setMonth(nextPayment.getMonth() + 1);
        const { monthlyInvoice, registrationInvoice, userInstance } = await this.dbService.$transaction(async (tx) => {
            const userInstance = await tx.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phone,
                    cardio: user.cardio,
                    presonalTrainer: user.personalTrainer,
                    nextPayment
                }
            });
            const registrationInvoice = await tx.invoice.create({
                data: {
                    fee: user.registrationFee,
                    userId: userInstance.id,
                    invoiceType: 'REGISTRATION_FEE',
                    description: "Invoice For Registration",
                }
            });
            const monthlyInvoice = await tx.invoice.create({
                data: {
                    fee: user.monthlyFee,
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
    findAll(paymentStatus, query) {
        return this.dbService
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