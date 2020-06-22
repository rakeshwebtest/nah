import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookmarkPageRoutingModule } from './bookmark-routing.module';

import { BookmarkPage } from './bookmark.page';
import { PostListModule } from '../posts/post-list/post-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostListModule,
    BookmarkPageRoutingModule
  ],
  declarations: [BookmarkPage]
})
export class BookmarkPageModule {}
