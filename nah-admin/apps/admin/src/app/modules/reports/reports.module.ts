import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { UserReportsListComponent } from './user-reports-list/user-reports-list.component';
import { InputTextModule } from 'primeng/inputtext';
import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [ProfitLossComponent, BetHistoryComponent, UserReportsListComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    TableModule,
    DropdownModule,
    RadioButtonModule,
    FormsModule,
    InputTextModule,
    ChartModule
    ]
})
export class ReportsModule { }
