import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard.component';
import { MeetingListModule } from '../shared/meeting-list/meeting-list.module';
import { MeetingsPageModule } from '../meetings/meetings.module';
import { MeetingsPage } from '../meetings/meetings.page';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'type/all'
      },
      {
        path: 'type/:type',
        component: MeetingsPage
      }
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MeetingsPageModule,
    CommonModule,
    IonicModule,
    MeetingListModule
  ]
})
export class DashboardModule { }
