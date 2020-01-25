import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeoplesIconsComponent } from './peoples-icons/peoples-icons.component';
import { PeoplesListComponent } from './peoples-list/peoples-list.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PeoplesIconsComponent, PeoplesListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents:[PeoplesListComponent],
  exports: [PeoplesIconsComponent, PeoplesListComponent]
})
export class PeoplesModule { }
