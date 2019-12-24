import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';

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
  entryComponents: [PopoverMenuComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule
  ]
})
export class UserProfileModule { }
