import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileEditPageRoutingModule } from './profile-edit-routing.module';

import { ProfileEditPage } from './profile-edit.page';
import { SharedProfileEditModule } from '../shared/shared-profile-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileEditPageRoutingModule,
    SharedProfileEditModule
  ],
  declarations: [ProfileEditPage]
})
export class ProfileEditPageModule {}
