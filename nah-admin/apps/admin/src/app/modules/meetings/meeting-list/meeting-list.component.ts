import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AppHttpClient } from '../../../utils/app-http-client.service';

@Component({
  selector: 'theapp-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss']
})
export class MeetingListComponent implements OnInit {
  selectedMeetings: any;
  cols = [];
  cityList = [];
  selectedCity: any;
  meetingList = [];
  modalRef: NgbModalRef;
  modalTitle: string;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  amoutType: string;
  search: string;
  model: any = {};
  userCreditDebitInfo: any = {};
  sessionInfo: any = {};
  users: any = [];
  userInfo: any = {};
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Los Angeles', code: 'LA' },
    { name: 'Chicago', code: 'CH' }
  ];

  constructor(private appHttp: AppHttpClient, private modalService: NgbModal,
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
      {
        'city': 'New York', 'meetingName': 'Meeting 1', 'meetingDate': '05-01-2020', 'meetingTime': '10:00 To 11:00', 'meetingVenue': 'New York', 'createdBy': 'Mohan Babu'
      },
      {
        'city': 'Los Angeles', 'meetingName': 'Meeting 2', 'meetingDate': '04-01-2020', 'meetingTime': '10:00 To 11:00', 'meetingVenue': 'Los Angeles', 'createdBy': 'prasad duggirala'
      },
      {
        'city': 'Chicago', 'meetingName': 'Meeting 3', 'meetingDate': '03-01-2020', 'meetingTime': '10:00 To 11:00', 'meetingVenue': 'Chicago', 'createdBy': 'UZ 16LAB'
      }
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
