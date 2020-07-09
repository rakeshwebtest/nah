import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingsPage } from './meetings.page';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { MeetingCreateComponent } from './meeting-create/meeting-create.component';
import { MeetingTabsComponent } from './meeting-tabs/meeting-tabs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MeetingTabsComponent,
    children: [
      {
        path: 'all',
        component: MeetingsPage,
        data: {
          type: "all"
        }
      },
      {
        path: 'my-meeting',
        component: MeetingsPage,
        data: {
          type: "my-meeting"
        }
      },
      {
        path: 'upcoming',
        component: MeetingsPage,
        data: {
          type: "upcoming"
        }

      }
    ]
  },
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
