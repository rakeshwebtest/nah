import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NahFormlyModule } from 'src/app/utils/nah-formly/nah-formly.module';



@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NahFormlyModule
  ],exports:[ReportComponent]
})
export class ReportModule { }
