import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { UserReportsListComponent } from './user-reports-list/user-reports-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'reports',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: UserReportsListComponent
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
