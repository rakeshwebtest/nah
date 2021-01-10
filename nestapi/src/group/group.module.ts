import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { CommonserviceModule } from 'src/shared/commonservice/commonservice.module';

@Module({
  imports: [CommonserviceModule],
  controllers: [GroupController]
})
export class GroupModule { }
