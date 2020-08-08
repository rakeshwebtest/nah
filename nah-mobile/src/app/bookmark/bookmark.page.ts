import { Component, OnInit, ViewChild } from '@angular/core';
import { PostListComponent } from '../posts/post-list/post-list.component';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit {


  @ViewChild(PostListComponent)
  postListC: PostListComponent;

  constructor() { }
  ionViewDidEnter() {
    console.log('loading bookmarks');
    this.postListC.reload();
  }

  ngOnInit() {
  }

}
