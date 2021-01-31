import { Module } from '@nestjs/common';
import { CommonserviceModule } from 'src/shared/commonservice/commonservice.module';
import { ReportCategoryController } from './report-category.controller';

@Module({
  imports: [CommonserviceModule],
  controllers: [ReportCategoryController]
})
export class ReportCategoryModule { }
