import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsPage } from './posts.page';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostDetatilsComponent } from './post-detatils/post-detatils.component';
import { AgendaCheckGuardService } from '../services/agenda-check-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  },
  {
    path: 'create',
    canActivate: [AgendaCheckGuardService],
    component: PostCreateComponent
  },
  {
    path: 'create/:postId',
    canActivate: [AgendaCheckGuardService],
    component: PostCreateComponent
  },
  {
    path: 'details/:postId',
    component: PostDetatilsComponent
  },
  {
    path: '',
    component: PostsPage,
    children: [
      {
        path: 'all',
        component: PostListComponent
      },
      {
        path: 'my-posts',
        component: PostListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsPageRoutingModule { }
