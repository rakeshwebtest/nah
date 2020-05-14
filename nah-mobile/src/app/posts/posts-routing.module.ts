import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsPage } from './posts.page';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'all'
  },
  {
    path: '',
    component: PostsPage,
    children:[
      {
        path:'all',
        component:PostListComponent
      },
      {
        path:'my-posts',
        component:PostListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsPageRoutingModule {}
