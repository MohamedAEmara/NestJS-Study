import { Module } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './cars/controllers/cars.controller';
import * as express from 'express';
import { CarsService } from './cars/services/cats.service';

@Module({
  imports: [],
  controllers: [AppController, CarsController],
  providers: [AppService, CarsService
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
