import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNotificationsComponent } from './user-notifications.component';
import { IonicModule } from '@ionic/angular';
import { LoadSkeletonModule } from '../load-skeleton/load-skeleton.module';



@NgModule({
  declarations: [UserNotificationsComponent],
  imports: [
    CommonModule,
    IonicModule,
    LoadSkeletonModule
  ],
  exports: [UserNotificationsComponent]
})
export class UserNotificationsModule { }
