import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopicListComponent } from './topic-list/topic-list.component';
import { AppSharedModuleModule } from '../app-shared-module/app-shared-module.module';

@NgModule({
  declarations: [PostListComponent, PostDetailsComponent, TopicListComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    ConfirmDialogModule,
    NgbModule,
    AppSharedModuleModule
  ]
})
export class PostsModule { }
