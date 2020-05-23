import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <ion-row *ngFor="let field of field.fieldGroup; let i = index;">
      <formly-field class="col" [field]="field"></formly-field>
      <div class="col-sm-2 d-flex align-items-center">
        <ion-button class="btn btn-danger" type="button" (click)="remove(i)">Remove</ion-button>
      </div>
    </ion-row>
    <ion-row style="margin:30px 0;">
      <ion-button class="btn btn-primary" type="button" (click)="add()">{{ to.addText }}</ion-button>
    </ion-row>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {}