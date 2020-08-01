import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { IonicModule } from '@ionic/angular';
import { LoadSkeletonModule } from '../load-skeleton/load-skeleton.module';



@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    IonicModule,
    LoadSkeletonModule
  ],
  exports: [UserListComponent]
})
export class UserListModule { }
