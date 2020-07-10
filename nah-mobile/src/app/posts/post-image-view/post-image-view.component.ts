import { Component, OnInit, Input } from '@angular/core';
import { GalleryItem, ImageItem, Gallery } from '@ngx-gallery/core';

@Component({
  selector: 'app-post-image-view',
  templateUrl: './post-image-view.component.html',
  styleUrls: ['./post-image-view.component.scss'],
})
export class PostImageViewComponent implements OnInit {
  @Input() images: any = [];
  gridType: any;
  moreCount = 0;
  defaultImg = "https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg";
  galleryId: any;
  items: GalleryItem[];

  constructor(public gallery: Gallery) { }

  ngOnInit() {
    console.log('images', this.images);
    this.galleryId = 'myLightbox_' + this.images[0].id;
    this.gridType = 'g' + this.images.length;
    if (this.images.length > 3) {
      this.moreCount = this.images.length - 3;
    }

    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);

    this.images.map(img => {
      img.src = img.fullPath;
      img.thumb = img.fullPath;
      // this.galleryItem.push(new ImageItem({ src: img.fullPath, thumb: img.fullPath }));
    });
  }

}
