import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { GroupListModule } from '../shared/group-list/group-list.module';
import { GroupListComponent } from '../shared/group-list/group-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: ':type',
        component: GroupListComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    UserProfileComponent,
    PopoverMenuComponent
  ],
  entryComponents: [PopoverMenuComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    GroupListModule
  ]
})
export class UserProfileModule { }
