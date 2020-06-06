import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsPage } from './posts.page';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostDetatilsComponent } from './post-detatils/post-detatils.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'all',
    pathMatch:'full'
  },
  {
    path:'create',
    component:PostCreateComponent
  },
  {
    path:'details',
    component:PostDetatilsComponent
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
