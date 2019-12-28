import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserAmountComponent } from './user-amount/user-amount.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: UserListComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
