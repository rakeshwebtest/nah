import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { AppHttpClient } from 'src/app/utils/app-http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { FileUploader, FileLikeObject, FileItem } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AppToasterService } from 'src/app/utils/app-toaster.service';

@Component({
  selector: 'app-lazy-upload-field',
  templateUrl: './lazy-upload-field.component.html',
  styleUrls: ['./lazy-upload-field.component.scss'],
})
export class LazyUploadFieldComponent extends FieldType implements OnInit {
  @ViewChild('fileInput', null) fileInput: ElementRef;
  allowedMimeType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  maxFileSize = 10 * 1024 * 1024;
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
    allowedMimeType: this.allowedMimeType,
    maxFileSize: this.maxFileSize
  });
  constructor(private http: AppHttpClient, private toaster: AppToasterService, public loadingController: LoadingController) {
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
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => this.onAfterAddingFile(fileItem);
 
  }

  onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any) {
    let errorMessage: string;
    switch (filter.name) {
      case 'fileSize':
        errorMessage = `Maximum upload size exceeded (${item.size} of ${this.maxFileSize} allowed)`;
        break;
      case 'mimeType':
        const allowedTypes = this.allowedMimeType.join();
        // errorMessage = `Type "${item.type} is not allowed. Allowed types: "${allowedTypes}"`;
        errorMessage = `Type "${item.type}" is not allowed.`;
        break;
      default:
        errorMessage = `Unknown error(filter is ${filter.name})`;
    }
    if (errorMessage) {
      this.toaster.presentToast(errorMessage);
    }
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
    // let latestFile = this.uploader.queue[this.uploader.queue.length - 1];
    // this.uploader.queue = [];
    // console.log('this.uploader.queue');
    // this.uploader.queue.push(latestFile);
    console.log(';this.uploader.queue', this.uploader.queue);
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
    this.uploader.clearQueue();
    this.presentLoading(loading);
    this.http.post('asset', formData).subscribe(res => {
      if (res.success) {
        this.fileInput.nativeElement.value = '';
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
    // this.http.delete('asset', this.uploadedImages[inx]).subscribe();
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
