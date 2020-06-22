import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaViewComponent } from './agenda-view.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AgendaViewComponent],
  imports: [
    RouterModule,
    CommonModule,
    IonicModule
  ],
  exports: [AgendaViewComponent]
})
export class AgendaViewModule { }
