import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { AppHttpClient } from 'src/app/utils/app-http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-lazy-upload-field',
  templateUrl: './lazy-upload-field.component.html',
  styleUrls: ['./lazy-upload-field.component.scss'],
})
export class LazyUploadFieldComponent extends FieldType implements OnInit {
  @ViewChild('fileInput', null) fileInput: ElementRef;
  previewUrl = null;
  previewUrls: any[] = [];
  uploadedImages = [];
  constructor(private http: AppHttpClient, public loadingController: LoadingController) {
    super();
  }
  ngOnInit() {
    this.to.showTempPics = true;
  }

  onFileChange(event) {
    if (this.to.multiple) {
      if (event.target.files.length > 0) {
        // this.previewUrls = [];
        // for (let index = 0; index < event.target.files.length; index++) {
        //   const file = event.target.files[index];
        //   const reader = new FileReader();
        //   reader.readAsDataURL(file);
        //   reader.onload = (_event) => {
        //     // this.previewUrl = reader.result;
        //     this.previewUrls.push(reader.result);
        //   };
        // }
        this.upload(event.target.files);
      }
    }
  }
  async upload(files) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      formData.append('images[]', file);
    }
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    };
    this.http.post('asset', formData).subscribe(res => {
      if (res.success) {
        if (res.data) {
          this.uploadedImages = [...res.data, ... this.uploadedImages];
          this.valueUpdate();
        }
        loading.dismiss();
      } else {
        loading.dismiss();
      }
    }, err => {
      loading.dismiss();
    });
  }
  deleteImg(inx) {
    this.uploadedImages.splice(inx, 1);
    this.valueUpdate();
  }
  valueUpdate() {
    this.formControl.setValue(this.uploadedImages);
  }

}
