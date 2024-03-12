import { Controller, Get, HttpCode, Post, Header, Redirect, Query, Param, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from './dto/create-car.dto';
import { CarsService } from './cats.service';
import { Car } from './interfaces/cars.interface';


@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) {}

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
    @Redirect('https://docs.nestjs.com', 200    )
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }   


    @Get('github-redirect')
    @Redirect('https://github.com/mohamedaemara', 200)

    

    @Get()
    @HttpCode(200)
    async findAll(): Promise<Car[]> {
        return this.carsService.findAll();
    }

}

