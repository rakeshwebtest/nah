import { Module } from '@nestjs/common';
import { AssestsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsEntity } from './assets.entity';
import { AssetService } from './asset.service';
@Module({
  imports: [TypeOrmModule.forFeature([AssetsEntity])],
  controllers: [AssestsController],
  providers: [AssetService],
})
export class AssetsModule {

}
