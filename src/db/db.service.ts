
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' }, // Log all queries
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });
  }
  async onModuleInit() {
    // this.$on('query' as never, (e: never) => {
      // console.log('Query: ' , e);})
  
    await this.$connect();
    console.log("DB conncted");
}}
