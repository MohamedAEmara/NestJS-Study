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
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-car.dto';
import { CarsService } from './cats.service';
import { Car } from './interfaces/cars.interface';

@Controller('cars')
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
  @Header('Cashe-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    this.carsService.create(createCatDto);
    // return 'this actions adds a new car';
    return createCatDto;
  }

  // Use variable parameter..
  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `ID: ${params.id}`;
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
