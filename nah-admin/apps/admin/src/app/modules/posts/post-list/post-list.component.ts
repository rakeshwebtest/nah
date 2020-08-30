import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppHttpClient } from '../../../utils/app-http-client.service';

@Component({
  selector: 'theapp-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
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
    private activatedRoute: ActivatedRoute) { }

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
  onView(meeting) {
    console.log('meeting', meeting);
    this.router.navigate(['details/' + meeting.id], { relativeTo: this.activatedRoute.parent })
  }
  searchList() {
    this.appHttp.get('posts/list?search=' + this.search).subscribe(res => {
      if (res.data) {
        this.postList = res.data;
      }
    });
  }
}
