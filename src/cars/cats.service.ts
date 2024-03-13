import { Injectable } from '@nestjs/common';
import { Car } from './interfaces/cars.interface';

@Injectable()
export class CarsService {
  private readonly cars: Car[] = [];

  create(car: Car) {
    this.cars.push(car);
  }

  findAll(): Car[] {
    return this.cars;
  }
}
