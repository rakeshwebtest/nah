import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingsPage } from './meetings.page';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { MeetingCreateComponent } from './meeting-create/meeting-create.component';

const routes: Routes = [

  {
    path: 'details/:id',
    component: MeetingDetailsComponent
  },
  {
    path: 'create',
    component: MeetingCreateComponent
  },
  {
    path: 'edit/:meetingId',
    component: MeetingCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingsPageRoutingModule { }
