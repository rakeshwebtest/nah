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
import { MeetingAddVideoPopupComponent } from './meeting-details/meeting-videos/meeting-add-video-popup/meeting-add-video-popup.component';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { MeetingTabsComponent } from './meeting-tabs/meeting-tabs.component';
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
    ReportModule,
    GalleryModule,
    LightboxModule,
    GallerizeModule
  ],
  declarations: [MeetingsPage, MeetingTabsComponent, MeetingDetailsActionsComponent, MeetingVideosComponent, MeetingDetailsComponent, MeetingCreateComponent, MeetingAddVideoPopupComponent],
  entryComponents: [MeetingDetailsActionsComponent, ReportComponent, MeetingAddVideoPopupComponent]
})
export class MeetingsPageModule { }
