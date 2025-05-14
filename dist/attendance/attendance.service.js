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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
const date_fns_1 = require("date-fns");
let AttendanceService = class AttendanceService {
    constructor(db) {
        this.db = db;
    }
    async create(attendance) {
        const todayMidnight = new Date();
        todayMidnight.setHours(0, 0, 0, 0);
        const tomorrowMidnight = new Date();
        tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1);
        tomorrowMidnight.setHours(0, 0, 0, 0);
        const oldAttendance = await this.db.attendance.findFirst({
            where: {
                userId: attendance.userId,
                createdAt: { gte: todayMidnight, lt: tomorrowMidnight }
            }
        });
        if (oldAttendance)
            throw new common_1.ConflictException("Attendance already exists.");
        return this.db.attendance.create({ data: attendance });
    }
    findAll(q) {
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
        });
    }
    async findAttendanceCountWhereDateIsToday() {
        const attendanceCount = await this.db.attendance.count({
            where: {
                createdAt: { gte: (0, date_fns_1.startOfDay)(new Date()), lt: (0, date_fns_1.startOfDay)((0, date_fns_1.addDays)(new Date(), 1)) }
            }
        });
        return { attendanceCount };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map