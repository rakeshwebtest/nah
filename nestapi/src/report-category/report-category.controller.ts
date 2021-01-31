import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReportCategoryService } from './report-category.service';
@ApiBearerAuth()
@ApiTags('Category')
@Controller('report-category')
export class ReportCategoryController {
    constructor(public categoryService: ReportCategoryService) { }
    /**
     * get all meeting with meembers
     */

    @Get('list')
    async getCategory(@Query() query: any) {
        const [result, total] = await this.categoryService.getReportCategoryList();
        return { message: false, success: true, data: result, count: total };
    }

}
