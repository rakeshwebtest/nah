import { Component, OnInit, Input } from '@angular/core';
import { GalleryItem, ImageItem, Gallery } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';

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
  constructor(public gallery: Gallery, public lightbox: Lightbox) { }

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

    console.log('this.items', this.items);
    const lightboxRef = this.gallery.ref(this.galleryId);
    lightboxRef.load(this.items);

    // this.images.map(img => {
    //   img.src = img.fullPath;
    //   img.thumb = img.fullPath;
    //   // this.galleryItem.push(new ImageItem({ src: img.fullPath, thumb: img.fullPath }));
    // });

  }
  

}
