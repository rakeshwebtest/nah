import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from './meeting-list.component';
import { IonicModule } from '@ionic/angular';
import { PeoplesModule } from '../peoples/peoples.module';

@NgModule({
  declarations: [MeetingListComponent],
  imports: [
    CommonModule,
    IonicModule,
    PeoplesModule
  ],
  exports: [MeetingListComponent]
})
export class MeetingListModule { }
