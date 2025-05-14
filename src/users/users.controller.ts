import { Controller, Get, Post, Body, Param, Query, UseInterceptors, UploadedFile, Req, } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './create-user-dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createUserDto: CreateUserDto) {
      console.log({createUserDto,image});
      
    return this.usersService.create(createUserDto);
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

  @Get("total")
  findTotalUsers(){
   return this.usersService.findAllUsersCount()
  }

  @Get("dashboard")
  getDashboardData(){}

}
