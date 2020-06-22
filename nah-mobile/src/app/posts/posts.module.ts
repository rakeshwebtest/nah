import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { AgendaViewModule } from '../agenda/agenda-view/agenda-view.module';
import { PostDetatilsComponent } from './post-detatils/post-detatils.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { NahFormlyModule } from '../utils/nah-formly/nah-formly.module';
import { PostListModule } from './post-list/post-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NahFormlyModule,
    PostsPageRoutingModule,
    AgendaViewModule,
    PostListModule
  ],
  declarations: [PostsPage, PostDetatilsComponent, PostCreateComponent]
})
export class PostsPageModule { }
