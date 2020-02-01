import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { GroupListModule } from '../shared/group-list/group-list.module';
import { AppRate } from '@ionic-native/app-rate/ngx';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent
  }
]

@NgModule({
  declarations: [
    UserProfileComponent,
    PopoverMenuComponent
  ],
  providers:[AppRate],
  entryComponents: [PopoverMenuComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    GroupListModule
  ]
})
export class UserProfileModule { }
