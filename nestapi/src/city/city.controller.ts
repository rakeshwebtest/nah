import { Controller, Get, Post, Put, Body, Delete, Param, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { ApiTags } from '@nestjs/swagger';
import { CityCreateDto, CityUpdateDto, CityListQueryDto } from './city.dto'
@ApiTags('City')
@Controller('city')
export class CityController {
    constructor(public cityService: CityService) { }

    @Get('list')
    async getCities(@Query() query: CityListQueryDto) {
        const data = await this.cityService.getCities(query);
        return { message: false, success: true, data };
    }

    @Get('info')
    async getInfo() {
        const data = await this.cityService.getCitiesInfo();
        return { message: false, success: true, data };
    }
    @Post()
    async createCity(@Body() city: CityCreateDto) {
        const data = await this.cityService.createUpdateCity(city);
        return { message: 'Created successfully', success: true, data };
    }
    @Put()
    async updateCity(@Body() city: CityUpdateDto) {
        const data = await this.cityService.createUpdateCity(city);
        return { message: 'Updated successfully', success: true, data };
    }

    @Delete(':cityId')
    async deleteCity(@Param('cityId') id: number) {
        const data = await this.cityService.deleteCity(id);
        return { message: 'Deleted successfully', success: true, data };
    }


}
