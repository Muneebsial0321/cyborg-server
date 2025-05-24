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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
const date_fns_1 = require("date-fns");
let InvoicesService = class InvoicesService {
    constructor(db) {
        this.db = db;
    }
    async create(invoice) {
        const user = await this.db.user.findFirst({ where: { id: invoice.userId } });
        if (!user)
            throw new common_1.NotFoundException('User Not Found');
        const [userInstance, invoiceInstance] = await this.db.$transaction([
            this.db.user.update({ where: { id: invoice.userId }, data: { nextPayment: new Date(invoice.nextPayment) } }),
            this.db.invoice.create({
                data: {
                    fee: invoice.fee,
                    invoiceType: invoice.invoiceType,
                    description: invoice.description,
                    userId: invoice.userId,
                }
            })
        ]);
        return { userInstance, invoiceInstance };
    }
    findAll(q) {
        const { createdAt, invoiceType, query } = q;
        console.log({
            createdAt: new Date(createdAt),
        });
        return this.db.invoice.findMany({
            where: {
                ...(query ? { user: { name: { contains: query } } } : {}),
                ...(createdAt ? { createdAt: { gte: (0, date_fns_1.startOfDay)(new Date(createdAt)), lt: (0, date_fns_1.startOfDay)((0, date_fns_1.addDays)(new Date(createdAt), 1)) } } : {}),
                ...(invoiceType ? { invoiceType } : {}),
            },
            include: { user: true }
        });
    }
    findOne(id) {
        return this.db.invoice.findUnique({ where: { id } });
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map