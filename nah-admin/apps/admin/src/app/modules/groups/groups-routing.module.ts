import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'groups',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: GroupListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
