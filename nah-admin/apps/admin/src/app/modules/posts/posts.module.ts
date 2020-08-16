import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { SafePipe } from '../meetings/safe.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PostListComponent, PostDetailsComponent, SafePipe],
  imports: [
    CommonModule,
    PostsRoutingModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    ConfirmDialogModule,
    NgbModule
  ],
  exports: [
    SafePipe
  ]
})
export class PostsModule { }
