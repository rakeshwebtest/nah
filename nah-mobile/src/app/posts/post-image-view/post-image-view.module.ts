import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { IonicModule } from '@ionic/angular';
import { PostImageViewComponent } from './post-image-view.component';


@NgModule({
  declarations: [PostImageViewComponent],
  imports: [
    CommonModule,
    IonicModule,
    GalleryModule,
    LightboxModule,
    GallerizeModule
  ],
  exports: [PostImageViewComponent]
})
export class PostImageViewModule { }
