import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { scan } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AppAlertService } from 'src/app/utils/app-alert.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  @Input() type: any; // my-posts all
  @Input() userId: any;
  @Input() searchKey: any;
  showAgendaView = false;
  limit = 20;
  offset = 0;
  loading = false;
  userInfo: any;

  postBehavior = new BehaviorSubject<{ opt: any, list: [] }>({ opt: 'list', list: [] });
  list$: Observable<any[]>;
  defaultImg = "https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg";
  constructor(private router: Router, private activeRouter: ActivatedRoute, private authS: AuthenticationService,
    public postS: PostService, private alertCtrl: AlertController, private alertS: AppAlertService) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }
  // ionViewWillEnter(){
  //   console.log('ionViewDidEnter');
  // }
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    const params = this.activeRouter.snapshot.routeConfig.path;
    this.offset = 0;
    this.loadPosts();

  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave')
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave')
  }
  ionViewWillUnload() {
    console.log('ionViewWillUnload')
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }
  ngOnInit() {
    console.log('activeRouter', this.activeRouter.snapshot.params);
    this.userInfo = this.authS.getUserInfo();

    this.list$ = this.postBehavior.asObservable().pipe(
      scan((acc, curr) => {
        if (curr.opt && curr.opt.type === 'delete') {
          let index = acc.findIndex((elt) => elt.id === curr.opt.id);
          acc.splice(index, 1);
          return [...acc];
        } else {
          if (this.offset === 0) {
            return [...curr.list];
          } else {
            return [...acc, ...curr.list];
          }
        }
      }, [])
    );
    this.loadPosts();
  }
  loadPosts(infiniteScroll?: any, reload?: any) {
    this.loading = true;
    if (infiniteScroll) {
      this.offset = this.offset + this.limit;
    }
    const payload: any = {};
    if (this.userId) {
      payload.userId = this.userId;
    }
    if (this.searchKey) {
      payload.search = this.searchKey;
    }
    payload.type = this.type || this.activeRouter.snapshot.routeConfig.path;
    payload.skip = this.offset;
    payload.take = this.limit;
    this.postS.getPosts(payload).subscribe(res => {
      this.loading = false;
      this.postBehavior.next({ opt: 'list', list: res.data });
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
      if (reload && reload.target) {
        reload.target.complete();
        reload.target.disabled = false;
      }
    });
  }
  navDetails(post) {
    this.router.navigate(['/posts/details/' + post.id]);
  }
  navProfile(user) {
    this.router.navigate(['/user-profile/' + user.id]);
  }

  bookmarkLikeAndDislike(post: any, type = 'bookmark') {
    // post.bookmark = !post.isBookMark;
    if (post.createdBy.id === this.userInfo.id && type !== 'bookmark') {
      return;
    }
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
            if (this.type === 'bookmarks' && type === 'bookmark') {
              this.postBehavior.next({ opt: { type: 'delete', id: post.id }, list: [] });
            }
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

    // this.postS.bookmarkLikeAndDislike({ postId: post.id, type: type }).subscribe(res => {

    // });
  }
  async unBookmark(items: any[], inx, reply) {
    let alert = await this.alertCtrl.create({
      message: 'Do you want to Remove bookmark form list?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            alert.dismiss(false);
            return false;
          }
        },
        {
          text: 'Okay',
          handler: () => {
            alert.dismiss(true);
            return false;
          }
        }
      ]
    });
    return alert;
  }

  reload() {
    this.offset = 0;
    this.loadPosts();
  }
  doRefresh(reload) {
    this.offset = 0;
    this.loadPosts(null, reload);
  }
  ngOnDestroy(): void {
    // this.list$.unsubscribe();
  }
}
