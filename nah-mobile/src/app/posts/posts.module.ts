import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { PostListComponent } from './post-list/post-list.component';
import { AgendaViewModule } from '../agenda/agenda-view/agenda-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule,
    AgendaViewModule
  ],
  declarations: [PostsPage,PostListComponent]
})
export class PostsPageModule {}