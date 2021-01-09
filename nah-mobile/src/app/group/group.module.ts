import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';
import { MyGroupComponent } from './my-group/my-group.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupService } from './group.service';
import { GroupListModule } from '../shared/group-list/group-list.module';
import { PeoplesModule } from '../shared/peoples/peoples.module';
import { MeetingListModule } from '../shared/meeting-list/meeting-list.module';
import { GroupTabsComponent } from './group-tabs/group-tabs.component';
import { GroupDetailsTabComponent } from './group-details-tab/group-details-tab.component';
import { UserListModule } from '../shared/user-list/user-list.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPageRoutingModule,
    GroupListModule,
    PeoplesModule,
    MeetingListModule,
    UserListModule,
    SuperTabsModule
  ],
  providers: [GroupService],
  declarations: [MyGroupComponent, GroupDetailsTabComponent, GroupDetailsComponent, GroupTabsComponent]
})
export class GroupPageModule { }
