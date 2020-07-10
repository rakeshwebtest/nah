import { Component, OnInit, Input } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
    console.log('images', this.images);
    this.gridType = 'g' + this.images.length;
    if (this.images.length > 3) {
      this.moreCount = this.images.length - 3;
    }
  }

}
