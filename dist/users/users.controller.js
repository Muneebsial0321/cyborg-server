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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const multer_config_1 = require("../config/multer.config");
const path = require("path");
const create_user_dto_1 = require("./create-user-dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(image, createUserDto) {
        const userWithImage = {
            ...createUserDto,
            image: image ? image.filename : null
        };
        return this.usersService.create(userWithImage);
    }
    findAll(query, paymentStatus) {
        console.log({ query, paymentStatus });
        return this.usersService.findAll(paymentStatus, query);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    async getStats() {
        const [totalUsers, usersToday, monthlyInvoices] = await Promise.all([
            this.usersService.getTotalUsers(),
            this.usersService.getUsersPresentToday(),
            this.usersService.getMonthlyInvoices()
        ]);
        const { totalRevenue } = monthlyInvoices;
        return {
            totalUsers,
            usersToday,
            totalRevenue
        };
    }
    findTotalUsers() {
        return this.usersService.findAllUsersCount();
    }
    getDashboardData() { }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image", {
        storage: (0, multer_1.diskStorage)({
            destination: multer_config_1.multerConfig.dest,
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
            }
        }),
        fileFilter: multer_config_1.multerConfig.fileFilter,
        limits: multer_config_1.multerConfig.limits
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("query")),
    __param(1, (0, common_1.Query)("pstatus")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/s/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)("total"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findTotalUsers", null);
__decorate([
    (0, common_1.Get)("dashboard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getDashboardData", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map