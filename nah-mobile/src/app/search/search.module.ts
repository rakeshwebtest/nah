import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { GroupListModule } from '../shared/group-list/group-list.module';
import { PostListModule } from '../posts/post-list/post-list.module';
import { MeetingListModule } from '../shared/meeting-list/meeting-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    SuperTabsModule,
    GroupListModule,
    PostListModule,
    MeetingListModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule { }
