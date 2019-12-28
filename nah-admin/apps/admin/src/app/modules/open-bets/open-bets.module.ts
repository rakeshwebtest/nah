import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenBetsComponent } from './open-bets.component';
import { Routes, RouterModule } from '@angular/router';
import {AccordionModule} from 'primeng/accordion';
import { TableModule } from 'primeng/table';
const routes: Routes = [
  {
    path: '',
    component: OpenBetsComponent
  }];

@NgModule({
  declarations: [OpenBetsComponent],
  imports: [
    CommonModule,
    AccordionModule,
    TableModule,
    RouterModule.forChild(routes)
  ]
})
export class OpenBetsModule { }
