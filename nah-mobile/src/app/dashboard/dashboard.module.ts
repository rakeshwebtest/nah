import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard.component';
import { MeetingListModule } from '../shared/meeting-list/meeting-list.module';
import { MeetingsPageModule } from '../meetings/meetings.module';
import { MeetingsPage } from '../meetings/meetings.page';
import { BottomTabsComponent } from './bottom-tabs/bottom-tabs.component';
import { CommunityTabComponent } from './community-tab/community-tab.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BottomTabsComponent,
    CommunityTabComponent
  ],
  imports: [
    MeetingsPageModule,
    RouterModule,
    CommonModule,
    IonicModule,
    MeetingListModule
  ],
  exports: [DashboardComponent, BottomTabsComponent, CommunityTabComponent]
})
export class DashboardModule { }
