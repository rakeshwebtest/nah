import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-button',
  template: `
      <ion-button [type]="to.type" [ngClass]="to.class" (click)="onClick($event)">
        {{ to.text }}
      </ion-button>
  `,
})
export class FormlyFieldButton extends FieldType {
  onClick($event) {
    if (this.to.onClick) {
      this.to.onClick($event);
    }
  }
}