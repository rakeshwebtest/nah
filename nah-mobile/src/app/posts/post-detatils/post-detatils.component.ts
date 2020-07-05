import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from 'src/app/utils';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private postS: PostService, private activeRoute: ActivatedRoute) { }

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
    this.postS.getPosts({ postId: postId }).subscribe(res => {
      this.post = res.data;
    });
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
