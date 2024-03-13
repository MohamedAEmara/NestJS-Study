import { Module } from "@nestjs/common";
import { CarsController } from "./cars.controller";
import { CarsService } from "./cats.service";
import { CommonModule } from "src/common/common.module";

@Module({
    controllers: [CarsController],
    providers: [CarsService],
    // If you want to make "CarsService" shared between other modules
    // You have to add it to export array like this:
    imports: [CommonModule],
    exports: [CarsService, CommonModule]
    // Now any module that imports the (CarsModule) has access to the "CarsService".

    // Note: A module can also export a module it already imports ass seen ABOVE...
})

export class CarsModule {}
