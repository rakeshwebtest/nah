import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <ion-row class="repeat-row" *ngFor="let field of field.fieldGroup; let i = index;">
      <formly-field class="repeat-field" [field]="field"></formly-field>
      <div class="repeat-delete">
        <ion-button color="danger" type="button" (click)="remove(i)"><ion-icon name="trash"></ion-icon></ion-button>
      </div>
    </ion-row>
    <ion-row style="margin:30px 0;display: flex;justify-content: center;">
      <ion-button class="btn btn-primary" type="button" (click)="add()">{{ to.addText }}</ion-button>
    </ion-row>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {}