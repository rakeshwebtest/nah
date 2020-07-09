import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookmarkPage } from './bookmark.page';

const routes: Routes = [
  {
    path: '',
    component: BookmarkPage,
    data: {
      type: 'bookmarks'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookmarkPageRoutingModule { }
