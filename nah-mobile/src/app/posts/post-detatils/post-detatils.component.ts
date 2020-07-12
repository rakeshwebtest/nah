import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from 'src/app/utils';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { AppAlertService } from 'src/app/utils/app-alert.service';

@Component({
  selector: 'app-post-detatils',
  templateUrl: './post-detatils.component.html',
  styleUrls: ['./post-detatils.component.scss'],
})
export class PostDetatilsComponent implements OnInit {
  public postDetails = [];
  public commentMsg: any;
  post: any;
  defaultImg = "https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg";
  constructor(private postS: PostService, private activeRoute: ActivatedRoute, private alertS: AppAlertService) { }

  ngOnInit() {
    this.postDetails = [
      {
        name: 'UZ 16LAB@anties',
        avatarUrl: 'https://snusercontent.global.ssl.fastly.net/member-profile-full/17/409717_7651259.jpg',
        createdDate: 'May 31, 2020',
        imageUrl: 'https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg'
      }
    ];
    const postId: any = this.activeRoute.snapshot.params.postId;
    this.postS.getPostById(postId).subscribe(res => {
      this.post = res.data;
    });
  }
  bookmarkLikeAndDislike(post, type = 'bookmark') {
    const postBookmareService = this.postS.bookmarkLikeAndDislike({ postId: post.id, type: type });
    if (post['bookmark']) {
      this.alertS.presentConfirm('', 'Do you want to Remove bookmark from list?').then(res => {
        if (res) {
          if (post[type]) {
            post[type] = null;
            post[type + 'Count'] = post[type + 'Count'] - 1;
          } else {
            post[type] = {};
            post[type + 'Count'] = post[type + 'Count'] + 1;
          }
          postBookmareService.subscribe(data => {
          });
        }
      });
    } else {
      if (post[type]) {
        post[type] = null;
        post[type + 'Count'] = post[type + 'Count'] - 1;
      } else {
        post[type] = {};
        post[type + 'Count'] = post[type + 'Count'] + 1;
      }
      postBookmareService.subscribe();

    }
  }
  navDetails() {

  }
  replyComment(c?: any) {

  }
  deleteComment() {

  }
  addComment(stg: string) {

  }

}
