import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadSkeletonComponent } from './load-skeleton.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [LoadSkeletonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [LoadSkeletonComponent]
})
export class LoadSkeletonModule { }
