import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [UserListComponent]
})
export class UserListModule { }
