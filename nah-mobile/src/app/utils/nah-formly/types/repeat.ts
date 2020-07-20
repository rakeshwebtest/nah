import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <ion-row class="repeat-row" *ngFor="let field of field.fieldGroup; let i = index;">
      <formly-field class="repeat-field" [field]="field"></formly-field>
      <div class="repeat-delete">
        <ion-button class="custom-height" color="danger" type="button" [disabled]="to.min > i" (click)="remove(i)"><ion-icon name="trash"></ion-icon></ion-button>
      </div>
    </ion-row>
    <ion-row style="margin:30px 0;display: flex;justify-content: center;" *ngIf="checkLength()">
      <ion-button class="btn btn-primary" type="button" (click)="add()">{{ to.addText }}</ion-button>
    </ion-row>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {

  checkLength() {
    if (this.formControl.value && this.formControl.value.length) {
      if (this.to.max) {
        return this.formControl.value.length < this.to.max;
      }
    }
    return true;
  }

}