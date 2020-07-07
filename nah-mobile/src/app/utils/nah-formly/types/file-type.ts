import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-field-file',
    template: `
  <ion-input #fileInput  type="file" label="test" [ngClass]="{'multiple-files':to.multiple}"
  accept="image/x-png,image/gif,image/jpeg"
   [multiple]="to.multiple"
  (change)="onFileChange($event)"
   [formControl]="formControl" [ionFormlyAttributes]="field"></ion-input>
   <div class='file-view' *ngIf="previewUrl
   && !this.to.multiple">
        <span class="img-delete" (click)="deleteImg()">
            <ion-icon name="trash"></ion-icon>
        </span>
        <ion-img class="ion-text-center m-height-250"  [src]="previewUrl" style="height: 150px;padding:10px"></ion-img>
    </div>
    <div class='container multiple-image-list' *ngIf="previewUrls
   && this.to.multiple && to.showTempPics">
        <div class="image-list-block" *ngFor="let url of previewUrls;let inx=index">
        <span class="img-delete" (click)="multipleImgDelete(inx)">
            <ion-icon name="trash"></ion-icon>
        </span>
        <ion-img class="image-thumb"  [src]="url"></ion-img>
        </div>
    </div>
 `,
    styles: [`
    .multiple-img-view{
        max-height: 150px;
        padding: 10px;
        width: 90px;
    }
    .file-view{
        position: relative
    }
    .img-delete{
        top: 5px;
    }
 `]
})
export class FieldFileComponent extends FieldType implements OnInit {
    @ViewChild('fileInput', null) fileInput: ElementRef;
    previewUrl = null;
    previewUrls: any[] = [];
    ngOnInit() {
        console.log('te', this.model, this.field.key);
        this.to.showTempPics = true;
        const path = this.model['imageUrl'];
        if (path) {
            this.previewUrl = path;
        }
        if(this.to.showTempPics == false){
            this.to.showTempPics = false;
        }
    }

    onFileChange(event) {
        if (this.to.multiple) {
            if (event.target.files.length > 0) {
                // this.previewUrls = [];
                for (let index = 0; index < event.target.files.length; index++) {
                    const file = event.target.files[index];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (_event) => {
                        // this.previewUrl = reader.result;
                        this.previewUrls.push(reader.result);
                    };


                }
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
        };
    }
    deleteImg() {
        this.formControl.setValue(null);
        // this.fileInput.nativeElement.value = "";
        this.previewUrl = null;
        this.model.imageUrl = null;
    }
    multipleImgDelete(inx) {
        this.previewUrls.splice(inx, 1);
    }
}
