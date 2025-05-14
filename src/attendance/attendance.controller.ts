import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Prisma } from '@prisma/client';


export type AttendanceSearchType = {
  query: string | null;
  createdAt: string | null;
  attendanceType: 'MORNING' | 'EVENING' | null;
}
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Post()
  create(@Body() createAttendanceDto: Prisma.AttendanceUncheckedCreateInput) {
    console.log({ createAttendanceDto });
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  findAll(
    @Query() q: AttendanceSearchType
  ) {
    console.log({q});
    
    return this.attendanceService.findAll(q);
  }

  @Get("today")
  findTodaysAttendance(){
    return this.attendanceService.findAttendanceCountWhereDateIsToday()
  }

}
