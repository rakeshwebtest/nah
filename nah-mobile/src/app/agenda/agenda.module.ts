import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';
import { AgendaPage } from './agenda.page';
import { NahFormlyModule } from '../utils/nah-formly/nah-formly.module';
import { AgendaViewModule } from './agenda-view/agenda-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NahFormlyModule,
    AgendaViewModule,
    AgendaPageRoutingModule
  ],
  declarations: [AgendaPage]
})
export class AgendaPageModule {}
