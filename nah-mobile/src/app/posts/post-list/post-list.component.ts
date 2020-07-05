import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { scan } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  public postList = [];
  showAgendaView = false;
  limit = 100;
  offset = 0;
  postBehavior = new BehaviorSubject<any[]>([]);
  list$: Observable<any[]>;
  defaultImg = "https://static.planetminecraft.com/files/resource_media/screenshot/1506/nah8616087.jpg";
  constructor(private router: Router, private activeRouter: ActivatedRoute, public postS: PostService) {

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
    this.loadPosts({ type: this.activeRouter.snapshot.routeConfig.path });

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
        if (this.offset === 0) {
          return [...curr];
        } else {
          return [...acc, ...curr];
        }
      }, [])
    );
    this.loadPosts({ type: this.activeRouter.snapshot.routeConfig.path });
  }
  loadPosts(payload = {}) {
    this.postS.getPosts(payload).subscribe(res => {
      this.postBehavior.next(res.data);
    });
  }
  navDetails(post) {
    this.router.navigate(['/posts/details/' + post.id]);
  }

  bookMark(post) {
    post.isBookMark = !post.isBookMark;
    this.postS.bookMark({ postId: post.id }).subscribe(res=>{});
  }
  ngOnDestroy(): void {
    // this.list$.unsubscribe();
  }
}
