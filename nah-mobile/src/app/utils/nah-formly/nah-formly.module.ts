import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VerticalFieldComponent } from './wrappers/vertical';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FieldFileComponent } from './types/file-type';
import { FieldSelectableComponent } from './types/select-type';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormlyFieldButton } from './types/button-type.component';
import { FieldDatetime } from './types/datetime'
import { RepeatTypeComponent } from './types/repeat';
import { FieldYoutubVideoUrlComponent } from './types/field-youtub-video-url/field-youtub-video-url.component';
import { LazyUploadFieldModule } from './types/lazy-upload-field/lazy-upload-field.module';
@NgModule({
  declarations: [
    VerticalFieldComponent,
    FieldFileComponent,
    FieldSelectableComponent,
    FormlyFieldButton,
    RepeatTypeComponent,
    FieldDatetime,
    FieldYoutubVideoUrlComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyIonicModule,
    IonicSelectableModule,
    LazyUploadFieldModule,
    FormlyModule.forRoot({
      wrappers: [{ name: 'vertical', component: VerticalFieldComponent }],
      types: [
        { name: 'file', component: FieldFileComponent, wrappers: ['vertical'] },
        { name: 'video', component: FieldYoutubVideoUrlComponent, wrappers: ['vertical'] },
        { name: 'button', component: FormlyFieldButton, wrappers: ['vertical'] },
        { name: 'datetime', component: FieldDatetime, wrappers: ['vertical'] },
        { name: 'selectable', component: FieldSelectableComponent, wrappers: ['vertical'] },
        { name: 'repeat', component: RepeatTypeComponent, wrappers: ['vertical'] }
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
