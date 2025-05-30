import { Controller, Get, Post, Body, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { multerConfig } from '../config/multer.config';
import * as path from 'path';
import { CreateUserDto } from './create-user-dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: multerConfig.dest,
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
    }),
    fileFilter: multerConfig.fileFilter,
    limits: multerConfig.limits
  }))
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createUserDto: CreateUserDto) {
    const userWithImage = {
      ...createUserDto,
      image: image ? image.filename : null
    };
    return this.usersService.create(userWithImage);
  }

  @Get()
  findAll(
    @Query("query") query: string | null,
    @Query("pstatus") paymentStatus: "paid" | "finishing" | "due" | null,
  ) {
    console.log({ query, paymentStatus });

    return this.usersService.findAll(paymentStatus, query);
  }

  @Get('/s/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('/stats')
  async getStats() {
    const [totalUsers, usersToday, monthlyInvoices, morningAttendance, eveningAttendance, attendanceToday] = await Promise.all([
      this.usersService.getTotalUsers(),
      this.usersService.getUsersPresentToday(),
      this.usersService.getMonthlyInvoices(),
      this.usersService.getAllMorningAttendance(),
      this.usersService.getAllEveningAttendance(),
      this.usersService.getAllAttendanceToday(),
    ]);

    const { totalRevenue } = monthlyInvoices;

    return [
      { label: "Total Users", data: totalUsers },
      { label: "Users Today", data: usersToday },
      { label: "Total Revenue", data: totalRevenue },
      { label: "Attendance Today", data: attendanceToday },
      { label: "Morning Attendance", data: morningAttendance },
      { label: "Evening Attendance", data: eveningAttendance },
    ];
  }

  @Get("total")
  findTotalUsers() {
    return this.usersService.findAllUsersCount()
  }

  @Get("dashboard")
  getDashboardData() { }

}
