import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-field-file',
    template: `
  <ion-input  type="file" label="test" [ngClass]="{'multiple-files':to.multiple}"
  accept="image/x-png,image/gif,image/jpeg"
   [multiple]="to.multiple"
  (change)="onFileChange($event)"
   [formControl]="formControl" [ionFormlyAttributes]="field"></ion-input>
   <ion-img class="ion-text-center m-height-250" *ngIf="!formControl.value 
   && !this.to.multiple && model.imageUrl" [src]="model.imageUrl" style="height: 150px;padding:10px"></ion-img>
       
  `,
})
export class FieldFileComponent extends FieldType implements OnInit {
    ngOnInit() {

    }

    onFileChange(event) {
        if (this.to.multiple) {
            if (event.target.files.length > 0) {
                // const files:File[] = [];
                // for (let index = 0; index < event.target.files.length; index++) {
                //     const file = event.target.files[index];
                //     files.push(file);

                // }
                this.formControl.setValue(event.target.files);
            }
        } else {
            if (event.target.files.length > 0) {
                const file = event.target.files[0];
                this.formControl.setValue(file);
            }
        }

    }
}
