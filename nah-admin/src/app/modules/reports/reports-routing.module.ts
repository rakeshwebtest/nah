import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { BetHistoryComponent } from './bet-history/bet-history.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/profit-loss',
    pathMatch: 'full'
  },
  {
    path: 'profit-loss',
    component: ProfitLossComponent
  },
  {
    path: 'bet-history',
    component: BetHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
