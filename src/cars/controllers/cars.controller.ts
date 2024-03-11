import { Controller, Get, HttpCode, Post, Header, Redirect, Query, Param, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from '../dto/create-car.dto';

@Controller('cars')
export class CarsController {
    @Post()
    @Header('Cashe-Control', 'none')
    create(@Body() createCatDto: CreateCatDto): any {
        console.log(`create cat body: ${createCatDto}`);
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
    findAll(): string {
        return 'This action returns all cars';
    }

}

