import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-ion-datetime',
  template: `
    <ion-datetime
      [displayFormat]="to.displayFormat"
      [pickerFormat]="to.pickerFormat"
      [doneText]="to.doneText"
      [cancelText]="to.cancelText"
      [min]="to.minDate"
      [max]="to.maxDate"
      [formControl]="formControl"
      [ionFormlyAttributes]="field">
    </ion-datetime>
  `,
})
export class FieldDatetime extends FieldType {
}
