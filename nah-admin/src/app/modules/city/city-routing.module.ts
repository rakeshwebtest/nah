import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityListComponent } from './city-list/city-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'city',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: CityListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
