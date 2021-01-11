import { Module } from '@nestjs/common';
import { GroupModule } from 'src/group/group.module';
import { GroupService } from 'src/group/group.service';

@Module({
    imports: [GroupModule],
    exports: [GroupService]
})
export class SharedGroupModule { }
