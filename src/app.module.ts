import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './cars/cars.controller';
import * as express from 'express';
import { CarsService } from './cars/cats.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CarsLoggerMiddleware } from './common/middleware/carslogger.middleware';

@Module({
  imports: [],
  controllers: [AppController, CarsController],
  providers: [AppService, CarsService,
    {
      provide: ExpressAdapter,
      useClass: ExpressAdapter,
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('cars');
    // NOTE: you can also restrict the middleware to a particular request method like this:
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.GET });
    // Now, this middleware will be applied on all GET method with any route. 

    consumer.apply(CarsLoggerMiddleware).forRoutes(CarsController);
    // NOTE: this will be applied on all routes in (CarsController)...
    // ANOTHER NOTE: forRoutes can take more than one argument...


    // We can also execlude some routes from using a middleware 
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cars', method: RequestMethod.POST },
        { path: 'cars', method: RequestMethod.PATCH },
        'cars/(.*)',
      )
      .forRoutes(CarsController);
  }
}
