import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyGroupComponent } from './my-group/my-group.component';
import { GroupDetailsComponent } from './group-details/group-details.component';


const routes: Routes = [
  {
    path: 'list',
    component: MyGroupComponent
  },
  {
    path: 'details/:id',
    component: GroupDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupPageRoutingModule {

}
