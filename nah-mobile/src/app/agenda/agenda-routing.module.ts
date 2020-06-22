import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaPage } from './agenda.page';
import { AgendaListComponent } from './agenda-list/agenda-list.component';

const routes: Routes = [
  {
    path: 'create',
    component: AgendaPage
  },
  {
    path: 'create/:id',
    component: AgendaPage
  },
  {
    path:'list',
    component:AgendaListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaPageRoutingModule {}
