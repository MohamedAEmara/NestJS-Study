import { Controller, Get, Post } from '@nestjs/common';
import { Request } from 'express';

@Controller('cars')
export class CarsController {
    @Post()
    create(): string {
        return 'this actions adds a new car';
    }
    @Get( )
    findAll(): string {
        return 'This action returns all cars';
    }
}