import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { ReactiveFormsModule } from '@angular/forms';
import { VerticalFieldComponent } from './wrappers/vertical';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FieldFileComponent } from './types/file-type';
@NgModule({
  declarations: [
    VerticalFieldComponent,
    FieldFileComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormlyIonicModule,
    FormlyModule.forRoot({
      wrappers: [{ name: 'vertical', component: VerticalFieldComponent }],
      types: [
        { name: 'file', component: FieldFileComponent, wrappers: ['vertical'] }
      ],
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
