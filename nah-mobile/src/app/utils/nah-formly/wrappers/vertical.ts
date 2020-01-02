import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
    selector: 'vertical-field',
    template: `
    <ion-item>
      <ion-label>
        {{ to.label }}
        <span *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
      </ion-label>
      <ng-template #fieldComponent></ng-template>
    </ion-item>
    <ion-item  *ngIf="showError">
      <ion-label>
        <ion-text color="danger">
            <formly-validation-message [field]="field"></formly-validation-message>
        </ion-text>
      </ion-label>
    </ion-item>
  `,
})
export class VerticalFieldComponent extends FieldWrapper {
    to: any;
}