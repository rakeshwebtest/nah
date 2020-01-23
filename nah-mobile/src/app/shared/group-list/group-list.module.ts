import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GroupListComponent } from './group-list.component';



@NgModule({
  declarations: [GroupListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers:[],
  exports: [GroupListComponent]
})
export class GroupListModule { }
