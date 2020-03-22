import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
    selector: 'vertical-field',
    template: `
    <ion-row>
      <ion-col class="label-full-width" size="12">
        <ion-label style="width:100%;">
          {{ to.label }}
          <span class="required-star" *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
        </ion-label>
      </ion-col>
      <ion-col class="value-full-width" size="12">
        <ng-template #fieldComponent></ng-template>
      </ion-col>
    </ion-row>
    <!-- <ion-item  *ngIf="showError">
      <ion-label>
        <ion-text color="danger">
            <formly-validation-message [field]="field"></formly-validation-message>
        </ion-text>
      </ion-label>
    </ion-item> -->
  `,
  styles: [`
  .full-width-label{
    display:flex;
    flex-direction: column;
  }
  .label-full-width{
    width:100%;
  }
  .value-full-width {
    width:100%;
  }
  input,ion-input {
    border:1px solid #ccc;
  }
  `]
})
export class VerticalFieldComponent extends FieldWrapper {
    to: any;
}
