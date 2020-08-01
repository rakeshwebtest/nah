import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-load-skeleton',
  templateUrl: './load-skeleton.component.html',
  styleUrls: ['./load-skeleton.component.scss'],
})
export class LoadSkeletonComponent implements OnInit {
  @Input() theme: any;
  @Input() limit: number;
  fakeUsers: Array<any> = new Array(5);
  constructor() { }

  ngOnInit() {
    if (this.limit > 0) {
      this.fakeUsers = new Array(this.limit);
    }
  }

}
