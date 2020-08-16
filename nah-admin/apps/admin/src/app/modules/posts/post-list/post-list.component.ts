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
  cityList = [];
  selectedCity: any;
  meetingList = [];
  modalTitle: string;
  form = new FormGroup({});
  amoutType: string;
  search: string;
  model: any = {};
  sessionInfo: any = {};
  users: any = [];
  userInfo: any = {};
  
  constructor(private appHttp: AppHttpClient, 
        private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cols = [
      { field: 'meetingName', header: 'Meeting Title' },
      { field: 'meetingDate', header: 'Date' },
      { field: 'meetingTime', header: 'Time' },
      { field: 'meetingVenue', header: 'Location' },
      { field: 'city', header: 'City' }
    ];
    this.meetingList = [     
    ];

    this.getMeetings();
  }

  getMeetings() {
    const payload: any = {};
    this.appHttp.get('meeting/list').subscribe(res => {
      if (res.data) {
        this.meetingList = res.data;
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
    this.appHttp.get('meeting/list?search='+this.search).subscribe(res => {
      if(res.data) {
        this.meetingList = res.data;
      }
    });
  }
}
