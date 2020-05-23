import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaViewComponent } from './agenda-view.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AgendaViewComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AgendaViewComponent]
})
export class AgendaViewModule { }
