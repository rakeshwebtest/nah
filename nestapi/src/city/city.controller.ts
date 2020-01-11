import { Controller, Get } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
    constructor(public cityService: CityService) { }

    @Get('list')
    async getCities() {
        const data = await this.cityService.getCities();
        return { message: false, data };
    }
}
