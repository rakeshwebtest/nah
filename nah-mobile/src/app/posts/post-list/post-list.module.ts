import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { IonicModule } from '@ionic/angular';
import { AgendaViewModule } from 'src/app/agenda/agenda-view/agenda-view.module';
import { PostImageViewModule } from '../post-image-view/post-image-view.module';
import { LoadSkeletonModule } from 'src/app/shared/load-skeleton/load-skeleton.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@NgModule({
  declarations: [PostListComponent],
  imports: [
    AgendaViewModule,
    CommonModule,
    IonicModule,
    PostImageViewModule,
    LoadSkeletonModule
  ],
  exports: [PostListComponent],
  providers: [SocialSharing]
})
export class PostListModule { }
