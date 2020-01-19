import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-field-file',
    template: `
  <ion-input  type="file" label="test" 
  accept="image/x-png,image/gif,image/jpeg"
  (change)="onFileChange($event)"
   [formControl]="formControl" [ionFormlyAttributes]="field"></ion-input>
  `,
})
export class FieldFileComponent extends FieldType {

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.formControl.setValue(file);
        }
    }
}
