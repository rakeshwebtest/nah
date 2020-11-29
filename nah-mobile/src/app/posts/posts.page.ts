import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { PostListComponent } from './post-list/post-list.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  agendaTitle = 'Your Agenda';
  userInfo: any;
  profileId: any;
  activeTabIndex = 0;
  @ViewChild('allPost', null) allPost: PostListComponent;
  @ViewChild('myPost', null) myPost: PostListComponent;

  constructor(private authService: AuthenticationService) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }
  // ionViewWillEnter(){
  //   console.log('ionViewDidEnter');
  // }
  ionViewWillEnter() {
    this.activeTabIndex = 0;
    this.allPost.reload();
    this.myPost.reload();
    // const params = this.activeRouter.snapshot.routeConfig.path;
    // this.offset = 0;
    // this.loadPosts();

  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }
  ionViewWillUnload() {
    console.log('ionViewWillUnload');
  }
  ionViewDidEnter() {
    console.log('ionViewWillUnload');
    // console.log('ionViewDidEnter');
    // const params = this.activeRouter.snapshot.routeConfig.path;
    // this.offset = 0;
    // this.loadPosts();
  }
  ngOnInit() {
    console.log('ngOnInit');
    const userInfo: any = this.authService.isAuthenticated();
    this.profileId = userInfo.id;
  }


}
