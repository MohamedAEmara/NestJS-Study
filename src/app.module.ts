import { Module } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './cars/controllers/cars.controller';
// import * from express;
import * as express from 'express';
@Module({
  imports: [],
  controllers: [AppController, CarsController],
  providers: [AppService,
    {
      provide: ExpressAdapter,
      useClass: ExpressAdapter,
    }
  ],
})
export class AppModule {
  constructor(private readonly expressAdapter: ExpressAdapter) {}
  configure(consumer: any) {
    this.expressAdapter.getInstance().use(express.json());
  }
}


// import { Module } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import * as express from 'express';

// @Module({})
// export class AppModule {
//   constructor(private readonly expressAdapter: ExpressAdapter) {}

//   configure(consumer: any) {
//     this.expressAdapter.getInstance().use(express.json());
//   }
// }