import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AppHttpClient } from '../../../utils/app-http-client.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'theapp-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
  providers: [ConfirmationService]
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
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.cols = [
      { field: 'meetingName', header: 'Meeting Title' },
      { field: 'meetingDate', header: 'Date' },
      { field: 'meetingTime', header: 'Time' },
      { field: 'meetingVenue', header: 'Location' },
      { field: 'city', header: 'City' }
    ];
    this.meetingList = [];
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
  onDelete(meeting) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete meeting?',
      accept: () => {
        this.appHttp.delete('meeting/' + meeting.id).subscribe(res => {
          this.getMeetings();
        });
      }
    })
  }
  searchList() {
    this.appHttp.get('meeting/list?search=' + this.search).subscribe(res => {
      if (res.data) {
        this.meetingList = res.data;
      }
    });
  }
}
