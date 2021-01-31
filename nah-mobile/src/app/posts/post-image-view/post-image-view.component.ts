import { Component, OnInit, Input } from '@angular/core';
import { GalleryItem, ImageItem, Gallery, GalleryRef } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-image-view',
  templateUrl: './post-image-view.component.html',
  styleUrls: ['./post-image-view.component.scss'],
})
export class PostImageViewComponent implements OnInit {
  @Input() images: any = [];
  @Input() showAll = false;
  gridType: any;
  moreCount = 0;
  defaultImg = "https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg";
  galleryId: any;
  items: GalleryItem[];
  remainingImg = [];
  lightboxRef: GalleryRef;
  private backButtonSub: Subscription;
  constructor(public gallery: Gallery, public lightbox: Lightbox, private platform: Platform) {

    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   if (this.lightboxRef) {
    //     this.lightboxRef.close();
    //     alert(1);

    //   }
    //   alert(0);
    // });


  }

  ionViewDidEnter() {
    this.backButtonSub = this.platform.backButton.subscribeWithPriority(
      10000,
      () => {
       // this.onBack();
        return;
      }
    );
  }
  ionViewWillLeave() {
    // this.backButtonSub.unsubscribe();
  }

  onBack() {
    if (this.lightbox) {
      this.lightbox.close();

    }
  }

  ngOnInit() {
    this.images.map(m => {
      m.previewUrl = m.fullPath;
      m.fullPath = m.fullPath + '?w=500';
      return m;
    });
    this.galleryId = 'myLightbox_' + this.images[0].id;
    this.gridType = 'g' + this.images.length;
    if (this.images.length > 3) {
      this.moreCount = this.images.length - 3;
      Object.assign(this.remainingImg, this.images);
      this.remainingImg.splice(0, 4);
    }
    this.items = this.images.map(item => new ImageItem({ src: item.previewUrl, thumb: item.fullPath }));

    this.lightboxRef = this.gallery.ref(this.galleryId);
    this.lightboxRef.load(this.items);

    // this.lightboxRef.thumbClick.subscribe(res=>{
    //   alert(2);
    // })



    // this.images.map(img => {
    //   img.src = img.fullPath;
    //   img.thumb = img.fullPath;
    //   // this.galleryItem.push(new ImageItem({ src: img.fullPath, thumb: img.fullPath }));
    // });

  }

}
