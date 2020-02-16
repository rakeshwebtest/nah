import { Controller, Get, Post, Put, Body, Delete, Param, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { ApiTags } from '@nestjs/swagger';
import { CityCreateDto, CityUpdateDto,CityListQueryDto } from './city.dto'
@ApiTags('City')
@Controller('city')
export class CityController {
    constructor(public cityService: CityService) { }

    @Get('list')
    async getCities(@Query() query:CityListQueryDto) {
        const data = await this.cityService.getCities(query);
        return { message: false, data };
    }

    @Get('info')
    async getInfo() {
        const data = await this.cityService.getCitiesInfo();
        return { message: false, data };
    }
    @Post()
    async createCity(@Body() city: CityCreateDto) {
        const data = await this.cityService.createUpdateCity(city);
        return { message: 'successfull create a city', data };
    }

    @Put()
    async updateCity(@Body() city: CityUpdateDto) {
        const data = await this.cityService.createUpdateCity(city);
        return { message: 'Updated successfull', data };
    }

    @Delete(':cityId')
    async deleteCity(@Param('cityId') id:number) {
        const data = await this.cityService.deleteCity(id);
        return { message: 'successfull delete city', data };
    }


}
