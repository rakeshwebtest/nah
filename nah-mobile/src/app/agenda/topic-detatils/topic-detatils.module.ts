import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicDetatilsPageRoutingModule } from './topic-detatils-routing.module';

import { TopicDetatilsPage } from './topic-detatils.page';
import { PostListModule } from 'src/app/posts/post-list/post-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicDetatilsPageRoutingModule,
    PostListModule
  ],
  declarations: [TopicDetatilsPage]
})
export class TopicDetatilsPageModule {}
