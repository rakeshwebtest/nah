import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from '../sign-in/sign-in.component';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule
  ], exports: [SignInComponent]
})
export class SharedProfileEditModule { }
