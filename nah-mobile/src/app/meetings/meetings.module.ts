import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingsPageRoutingModule } from './meetings-routing.module';

import { MeetingsPage } from './meetings.page';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { MeetingCreateComponent } from './meeting-create/meeting-create.component';
import { NahFormlyModule } from '../utils/nah-formly/nah-formly.module';
import { MeetingListModule } from '../shared/meeting-list/meeting-list.module';
import { TimeagoModule } from 'ngx-timeago';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingsPageRoutingModule,
    NahFormlyModule,
    MeetingListModule,
    TimeagoModule.forRoot()
  ],
  declarations: [MeetingsPage, MeetingDetailsComponent, MeetingCreateComponent]
})
export class MeetingsPageModule { }
