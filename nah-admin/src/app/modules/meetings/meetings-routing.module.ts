import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'meetings',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: MeetingListComponent
  },
  {
    path: 'details',
    component: MeetingDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingsRoutingModule { }
