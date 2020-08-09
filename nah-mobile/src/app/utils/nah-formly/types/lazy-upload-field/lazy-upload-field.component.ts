import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { AppHttpClient } from 'src/app/utils/app-http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { FileUploader, FileLikeObject, FileItem } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

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
  fieldInputName = 'images[]';
  uploader: FileUploader = new FileUploader({
    url: environment.apiUrl + '/api/asset',
    method: 'post',
    disableMultipart: false,
    autoUpload: false,
    itemAlias: 'images',
    allowedFileType: ['image']


  });
  constructor(private http: AppHttpClient, public loadingController: LoadingController) {
    super();
  }
  ngOnInit() {
    this.to.showTempPics = true;
    if (!this.to.multiple) {
      this.fieldInputName = 'images[]';
    }
    this.formControl.valueChanges.subscribe(res => {
      if (res && res.length > 0 && this.uploadedImages.length === 0) {
        this.uploadedImages = res || [];
      }
    });
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => this.onAfterAddingFile(fileItem)
  }

  // onFileChange(event: EventEmitter<File[]>) {
  //   console.log('eve', event);
  //   const file: File[] = event;
  //   if (this.to.multiple) {
  //     if (file.length > 0) {
  //       this.upload(file);
  //     }
  //   }
  // }
  onAfterAddingFile(fileItem: FileItem) {
    let latestFile = this.uploader.queue[this.uploader.queue.length - 1];
    this.uploader.queue = [];
    this.uploader.queue.push(latestFile);
    this.onFileSelected();
  }
  async onFileSelected() {
    const files: FileItem[] = this.uploader.queue;
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    const formData = new FormData();
    for (const f of files) {
      formData.append('images[]', f.file.rawFile, f.file.name);
    }
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    };
    this.presentLoading(loading);
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
  async presentLoading(loading) {
    return await loading.present();
  }

}
