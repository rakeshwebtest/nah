import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],exports:[ReportComponent]
})
export class ReportModule { }
