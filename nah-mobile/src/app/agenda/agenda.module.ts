import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';
import { AgendaPage } from './agenda.page';
import { NahFormlyModule } from '../utils/nah-formly/nah-formly.module';
import { AgendaViewModule } from './agenda-view/agenda-view.module';
import { AgendaListComponent } from './agenda-list/agenda-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
    NahFormlyModule,
    AgendaViewModule,
    AgendaPageRoutingModule
  ],
  declarations: [AgendaPage,AgendaListComponent]
})
export class AgendaPageModule {}
