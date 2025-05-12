import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AttendanceModule } from './attendance/attendance.module';
import { InvoicesModule } from './invoices/invoices.module';
import { DbModule } from './db/db.module';


@Module({
  imports: [UsersModule, AttendanceModule, InvoicesModule, DbModule],

})
export class AppModule {}
