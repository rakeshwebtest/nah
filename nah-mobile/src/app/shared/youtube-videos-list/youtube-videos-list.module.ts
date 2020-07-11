import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeVideosListComponent } from './youtube-videos-list.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [YoutubeVideosListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [YoutubeVideosListComponent]
})
export class YoutubeVideosListModule { }
