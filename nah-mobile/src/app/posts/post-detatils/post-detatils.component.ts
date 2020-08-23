import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { AppHttpClient } from 'src/app/utils';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppAlertService } from 'src/app/utils/app-alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController, IonContent, ActionSheetController } from '@ionic/angular';
import { FcmProviderService } from 'src/app/utils/fcm-provider.service';
import { Storage } from '@ionic/storage';
import { AppRouterNavigateService } from 'src/app/utils/app-router-navigate.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-post-detatils',
  templateUrl: './post-detatils.component.html',
  styleUrls: ['./post-detatils.component.scss'],
})
export class PostDetatilsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  public postDetails = [];
  public commentMsg: any;
  post: any;
  replyMsg: any = {};
  userInfo: any = {};
  loading = false;
  isOwner: boolean;
  defaultImg = "https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg";
  constructor(
    private postS: PostService, private activeRoute: ActivatedRoute, private http: AppHttpClient,
    public appRouter: AppRouterNavigateService,
    private router: Router,
    private storage: Storage,
    private alertS: AppAlertService, private alertCtrl: AlertController,
    private authService: AuthenticationService, private fcm: FcmProviderService,
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
    // this.fcm.fcmSubscribeToTopic('post-details').then(data => {
    //   console.log('fuck detaiol', data);
    // });

    this.postDetails = [
      {
        name: 'UZ 16LAB@anties',
        avatarUrl: 'https://snusercontent.global.ssl.fastly.net/member-profile-full/17/409717_7651259.jpg',
        createdDate: 'May 31, 2020',
        imageUrl: 'https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg'
      }
    ];
    const postId: any = this.activeRoute.snapshot.params.postId;
    this.loading = true;
    this.postS.getPostById(postId).subscribe(res => {
      this.post = res.data;
      if (this.post && this.post.createdBy.id === this.userInfo.id) {
        this.isOwner = true;
      }
      this.loading = false;
      if (this.activeRoute.snapshot.queryParams.comments) {
        setTimeout(() => {
          this.scrollToCommentBox();
        }, 500);

      }
    });
  }
  ngAfterViewInit() {

  }
  bookmarkLikeAndDislike(post, type = 'bookmark') {
    // if (post.createdBy.id === this.userInfo.id && type !== 'bookmark') {
    //   return;
    // }
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
  editPost(post) {
    this.storage.set('postDetails', this.post).then(res => {
      this.router.navigate(['/posts/create/' + post.id]);
    });
  }
  deletePost(post) {
    this.alertS.presentConfirm(null, 'Are you sure delete this post').then(res => {
      if (res) {
        console.log(res);
        post.isDeleted = 1;
        this.postS.createUpdatePost(post).subscribe(resData => {
          this.router.navigate(['/dashboard/posts']);
        }, error => {

        });
      }
    });
  }
  navDetails() {

  }
  addComment(comment) {
    const postId = this.post.id;
    const userInfo: any = this.authService.getUserInfo();
    let payLoad = {

    }
    if (comment) {
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
            this.scrollToCommentBox('comment-box');
            const _comment = res.data;
            _comment.createdBy = userInfo;
            _comment.replys = [];
            this.post.comments.unshift(_comment);

            this.commentMsg = null;
          }
        });
      }
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
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
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
  scrollToCommentBox(elementId = 'comment-box') {
    const y = document.getElementById(elementId).offsetTop;
    this.content.scrollToPoint(0, y);
  }
  clearReply() {
    this.replyMsg = {};
  }
  ngOnDestroy() {
    // this.fcm.fcmUnsubscribeFromTopic('post-details').then(res => {
    //   console.log('res leave', res);
    // });
  }
  async shareSocialMedia(post) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class share-icons',
      buttons: [
        {
          text: 'Facebook',
          role: 'destructive',
          icon: 'logo-facebook',
          handler: () => {
            console.log('post details', post);
            this.socialSharing.shareViaFacebook(post.title, null).then((res) => {
              // Success

            }).catch((e) => {
              // Error!
            });
          }
        }, {
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => {
            console.log('post details', post);
            this.socialSharing.shareViaTwitter(post.title, null).then((res) => {
              // Success
            }).catch((e) => {
              // Error!
            });
          }
        }, {
          text: 'Whatsapp',
          icon: 'logo-whatsapp',
          handler: () => {
            console.log('post details', post);
            this.socialSharing.shareViaWhatsApp(post.title, null).then((res) => {
              // Success
            }).catch((e) => {
              // Error!
            });
          }
        },
        {
          text: 'Instagram',
          icon: 'logo-instagram',
          role: 'cancel',
          handler: () => {
            console.log('post details', post);
            this.socialSharing.shareViaInstagram(post.title, null).then((res) => {
              // Success
            }).catch((e) => {
              // Error!
            });
          }
        }]
    });
    await actionSheet.present();
  }
}
