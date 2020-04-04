import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-field-file',
    template: `
  <ion-input #fileInput  type="file" label="test" [ngClass]="{'multiple-files':to.multiple}"
  accept="image/x-png,image/gif,image/jpeg"
   [multiple]="to.multiple"
  (change)="onFileChange($event)"
   [formControl]="formControl" [ionFormlyAttributes]="field"></ion-input>
   <div *ngIf="previewUrl 
   && !this.to.multiple">
        <span (click)="deleteImg()" >Delete</span>
        <ion-img class="ion-text-center m-height-250"  [src]="previewUrl" style="height: 150px;padding:10px"></ion-img>
    </div>
 `,
})
export class FieldFileComponent extends FieldType implements OnInit {
    @ViewChild('fileInput',null) fileInput: ElementRef;
    previewUrl = null;
    ngOnInit() {
        console.log('te', this.model, this.field.key);
        const path = this.model['imageUrl'];
        if (path) {
            this.previewUrl = path;
        }
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
                this.setPreviewUrl(file);
            }
        }

    }
    setPreviewUrl(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.previewUrl = reader.result;
        }
    }
    deleteImg() {
        this.formControl.setValue(null);
        // this.fileInput.nativeElement.value = "";
        this.previewUrl = null;
        this.model.imageUrl = null;
    }
}
