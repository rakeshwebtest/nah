import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { IonicModule } from '@ionic/angular';
import { AgendaViewModule } from 'src/app/agenda/agenda-view/agenda-view.module';
import { PostImageViewModule } from '../post-image-view/post-image-view.module';


@NgModule({
  declarations: [PostListComponent],
  imports: [
    AgendaViewModule,
    CommonModule,
    IonicModule,
    PostImageViewModule
  ],
  exports: [PostListComponent]
})
export class PostListModule { }
