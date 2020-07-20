import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { PostDetatilsComponent } from './post-detatils/post-detatils.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { NahFormlyModule } from '../utils/nah-formly/nah-formly.module';
import { PostListModule } from './post-list/post-list.module';
import { PostImageViewModule } from './post-image-view/post-image-view.module';
import { YoutubeVideosListModule } from '../shared/youtube-videos-list/youtube-videos-list.module';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NahFormlyModule,
    PostsPageRoutingModule,
    PostListModule,
    PostImageViewModule,
    YoutubeVideosListModule,
    TimeagoModule
  ],
  declarations: [PostsPage, PostDetatilsComponent, PostCreateComponent]
})
export class PostsPageModule { }
