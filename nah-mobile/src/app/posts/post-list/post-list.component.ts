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
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  public postList = [];
  @Input() type: any;
  showAgendaView = false;
  limit = 5;
  offset = 0;

  postBehavior = new BehaviorSubject<{ opt: any, list: [] }>({ opt: 'list', list: [] });
  list$: Observable<any[]>;
  defaultImg = "https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg";
  constructor(private router: Router, private activeRouter: ActivatedRoute,
    public postS: PostService, private alertCtrl: AlertController, private alertS: AppAlertService) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }
  // ionViewWillEnter(){
  //   console.log('ionViewDidEnter');
  // }
  ionViewWillEnter() {
    const params = this.activeRouter.snapshot.routeConfig.path;
    console.log('params', params);
    this.offset = 0;
    this.loadPosts();

  }
  ngOnInit() {
    console.log('activeRouter', this.activeRouter.snapshot.params);

    this.postList = [
      {
        name: 'UZ 16LAB@anties',
        avatarUrl: 'https://snusercontent.global.ssl.fastly.net/member-profile-full/17/409717_7651259.jpg',
        createdDate: 'May 31, 2020',
        imageUrl: 'https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg'
      },
      {
        name: 'UZ 18LAB@anties',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRayaWypvjJJ0p0cBrfr840z11UlQCwO4XoiKfYAQYlB0IoID4j&usqp=CAU',
        createdDate: 'May 31, 2020',
        imageUrl: 'https://blgxpria.com/content/images/size/w2000/2020/01/ideal-blog-post-length-for-seo-blogsperia.jpg'
      },
      {
        name: 'UZ 20LAB@anties',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRXgfKT1LHn3xPZlx42aOXkUbglh5apNE_yC5zydp0FyaUpCIFR&usqp=CAU',
        createdDate: 'May 31, 2020',
        imageUrl: 'https://ionicframework.com/docs/demos/api/card/madison.jpg'
      },
      {
        name: 'UZ 22LAB@anties',
        avatarUrl: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
        createdDate: 'May 30, 2020',
        imageUrl: 'https://i.ytimg.com/vi/caG9cKBf6Wg/maxresdefault.jpg'
      },
    ];
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
    if (infiniteScroll) {
      this.offset = this.offset + this.limit;
    }
    const payload: any = {};
    payload.type = this.type || this.activeRouter.snapshot.routeConfig.path;
    payload.skip = this.offset;
    payload.take = this.limit;
    this.postS.getPosts(payload).subscribe(res => {
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
