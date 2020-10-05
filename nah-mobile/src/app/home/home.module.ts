import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular'; 
import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  providers: [SignInWithApple]
})
export class HomeModule { }
