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
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { MeetingVideosComponent } from './meeting-details/meeting-videos/meeting-videos.component';
import { PeoplesModule } from '../shared/peoples/peoples.module';
import { MeetingDetailsActionsComponent } from './meeting-details/meeting-details-actions/meeting-details-actions.component';
import { ReportModule } from '../shared/report/report.module';
import { ReportComponent } from '../shared/report/report.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingsPageRoutingModule,
    NgxIonicImageViewerModule,
    NahFormlyModule,
    MeetingListModule,
    TimeagoModule.forRoot(),
    PeoplesModule,
    ReportModule
  ],
  declarations: [MeetingsPage, MeetingDetailsActionsComponent, MeetingVideosComponent, MeetingDetailsComponent, MeetingCreateComponent],
  entryComponents: [MeetingDetailsActionsComponent,ReportComponent]
})
export class MeetingsPageModule { }
