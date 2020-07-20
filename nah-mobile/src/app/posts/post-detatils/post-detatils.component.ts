import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from 'src/app/utils';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppAlertService } from 'src/app/utils/app-alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-post-detatils',
  templateUrl: './post-detatils.component.html',
  styleUrls: ['./post-detatils.component.scss'],
})
export class PostDetatilsComponent implements OnInit {
  public postDetails = [];
  public commentMsg: any;
  post: any;
  replyMsg: any = {};
  userInfo: any = {};
  defaultImg = "https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg";
  constructor(private postS: PostService, private activeRoute: ActivatedRoute, private http: AppHttpClient,
    private alertS: AppAlertService, private alertCtrl: AlertController,
    private authService: AuthenticationService) { }

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
    if (type === 'bookmark' && post['bookmark']) {
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

      if (type === 'like') {
        if (post.dislike) {
          post.dislikeCount = post.dislikeCount - 1;
        }
        post.dislike = null;

      } else if (type === 'dislike') {
        if (post.like) {
          post.likeCount = post.likeCount - 1;
        }
        post.like = null;
      }
      postBookmareService.subscribe();

    }
  }
  navDetails() {

  }
  addComment(comment) {

    const postId = this.post.id;
    const userInfo: any = this.authService.getUserInfo();
    let payLoad = {

    }
    if (this.replyMsg.id) {
      payLoad = {
        postCommentId: this.replyMsg.id,
        comment: comment,
        userId: userInfo.id
      };
      this.http.post('posts/comment-reply', payLoad).subscribe(res => {
        if (res.data) {
          const _comment = res.data;
          _comment.createdBy = userInfo;
          this.replyMsg.replys.push(_comment);
          this.commentMsg = null;
        }
        this.replyMsg = {};
      });

    } else {
      payLoad = {
        comment: comment,
        postId: postId,
        userId: userInfo.id
      };
      this.http.post('posts/comment', payLoad).subscribe(res => {
        if (res.data) {
          const _comment = res.data;
          _comment.createdBy = userInfo;
          _comment.replys = [];
          this.post.comments.unshift(_comment);

          this.commentMsg = null;
        }
      });
    }

    // this.meeting.comments.push();

  }
  replyComment(c) {
    this.replyMsg = c;
  }
  async deleteComment(items: any[], inx, reply) {
    let alert = await this.alertCtrl.create({
      message: 'Do you want to delete this Comment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            const comment = items[inx];
            let _url = 'posts/comment/';
            if (reply) {
              _url += 'reply/' + comment.id;

            } else {
              _url += comment.id;
            }

            this.http.delete(_url).subscribe(res => {

            });
            items.splice(inx, 1);

          }
        }
      ]
    });
    await alert.present();
  }
  clearReply() {
    this.replyMsg = {};
  }

}
