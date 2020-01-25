import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GroupListComponent } from './group-list.component';
import { PeoplesModule } from '../peoples/peoples.module';



@NgModule({
  declarations: [GroupListComponent],
  imports: [
    CommonModule,
    IonicModule,
    PeoplesModule
  ],
  providers:[],
  exports: [GroupListComponent]
})
export class GroupListModule { }
