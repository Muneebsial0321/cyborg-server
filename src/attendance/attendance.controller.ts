import { Controller, Get, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Prisma } from '@prisma/client';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() createAttendanceDto: Prisma.AttendanceUncheckedCreateInput) {
    console.log({ createAttendanceDto });
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }


}
