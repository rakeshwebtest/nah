import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppHttpClient } from '../../../utils/app-http-client.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'theapp-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [ConfirmationService]
})
export class PostListComponent implements OnInit {
  selectedMeetings: any;
  cols = [];
  postList = [];
  search: string;
  model: any = {};
  meetingList: any;
  constructor(private appHttp: AppHttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.cols = [
      { field: 'meetingName', header: 'Post Title' },
      { field: 'meetingDate', header: 'Date' },
      { field: 'meetingTime', header: 'Time' },
      { field: 'meetingVenue', header: 'Location' },
      { field: 'city', header: 'City' }
    ];
    this.postList = [];
    this.getPosts();
  }

  getPosts() {
    const payload: any = {};
    this.appHttp.get('posts/list').subscribe(res => {
      if (res.data) {
        this.postList = res.data;
      }
    });
  }

  onUpdate(event) {
    this.router.navigate(['details'], { relativeTo: this.activatedRoute.parent })
  }
  onRowSelect(event) {
    console.log('event', event);
    this.router.navigate(['details'], { relativeTo: this.activatedRoute.parent })
  }
  onView(post) {
    this.router.navigate(['details/' + post.id], { relativeTo: this.activatedRoute.parent })
  }
  deletePost(post) {
    //   this.appHttp.delete('posts/'+id).subscribe(res => {
    //     this.getPosts();
    // });
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete post?',
      accept: () => {
        this.appHttp.delete('posts/' + post.id).subscribe(res => {
          this.getPosts();
        });
      }
    })
  }
  searchList() {
    this.appHttp.get('posts/list?search=' + this.search).subscribe(res => {
      if (res.data) {
        this.postList = res.data;
      }
    });
  }
}
