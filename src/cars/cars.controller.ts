import {
  Controller,
  Get,
  HttpCode,
  Post,
  Header,
  Redirect,
  Query,
  Param,
  Body,
  ForbiddenException,
  UseFilters,
  Catch,
  // ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-car.dto';
import { CarsService } from './cats.service';
import { Car } from './interfaces/cars.interface';
import { HttpsExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { ParseIntPipe } from 'src/common/pipes/pase-int.pipe';
// In order to catch unhandled exception (regardless the exception type), Leave @Catch() decorator's parameter list empty like this:
@Catch()
@Controller('cars')
@UseFilters(new HttpsExceptionFilter()) // Now this filter will be applied on all controllers from cars-controller.
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get('')
  @HttpCode(200)
  async findAll(): Promise<Car[]> {
    try {
      return await this.carsService.findAll();
    } catch (err) {
      // throw new HttpException({
      //     statusCode: HttpStatus.FORBIDDEN,
      //     error: 'This is an error message'
      // }, HttpStatus.FORBIDDEN, {
      //     cause: err
      // });

      // NOTE: We can create "custom exception" like this and use it instead of default exception class.
      throw new ForbiddenException();
    }
  }

  @Post()
  // Use http-exception-filter in creating new car...
  @UseFilters(new HttpsExceptionFilter())
  @UseFilters(HttpsExceptionFilter) // NOTE: you can use class name instead of instances...
  // NOTE: now this exception filter is only applied on Create method.
  // To use this filter on all /cars, you can use if before (EXPORT) at the top of the module..
  @Header('Cashe-Control', 'none')
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.carsService.create(createCatDto);
    // return 'this actions adds a new car';
    return createCatDto;
  }

  // Use variable parameter..
  @Get(':id')
  // We use ParseIntPipe to ensure that the value of "id" is integer
  // Otherwise an exception will be thrown.
  // findOne(@Param('id', ParseIntPipe) id: number): string {
  //   console.log(id);
  //   return `ID: ${id}`;
  // }

  // We can also specify the statusCode in the error object like this:
  /*
    findOne(
      @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
      id: number
    ) {
      return this.carsService.findAll();
    }
  */

  findOne(@Param('id', new ParseIntPipe()) id) {
    return this.carsService.findAll();
  }
  // Use Redirect
  @Get('redirect')
  @Redirect('https://docs.nestjs.com', 200)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // @Get('github-redirect')
  // @Redirect('https://github.com/mohamedaemara', 200)
}
