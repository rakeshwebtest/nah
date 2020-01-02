import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { ReactiveFormsModule } from '@angular/forms';
import { VerticalFieldComponent } from './wrappers/vertical';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    VerticalFieldComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormlyIonicModule,
    FormlyModule.forRoot({
      wrappers: [{ name: 'vertical', component: VerticalFieldComponent }],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ]
    })
  ],
  exports: [
    ReactiveFormsModule,
    FormlyIonicModule,
    FormlyModule
  ]
})
export class NahFormlyModule { }
