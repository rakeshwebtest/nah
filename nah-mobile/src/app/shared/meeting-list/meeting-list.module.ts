import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from './meeting-list.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MeetingListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[MeetingListComponent]
})
export class MeetingListModule { }
