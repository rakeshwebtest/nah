import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
import { UserListModule } from '../shared/user-list/user-list.module';
import { UserNotificationsModule } from '../shared/user-notifications/user-notifications.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    UserNotificationsModule
  ],
  declarations: [NotificationsPage]
})
export class NotificationsPageModule { }
