import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'theapp-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss']
})
export class MeetingListComponent implements OnInit {
  selectedMeetings: any;
  cols = [];
  meetingList = [];
  modalRef: NgbModalRef;
  modalTitle: string;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  amoutType: string;
  model: any = {};
  userCreditDebitInfo: any = {};
  sessionInfo: any = {};
  users: any = [];
  userInfo: any = {};

  constructor(private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cols = [
      { field: 'city', header: 'City' },
      { field: 'meetingName', header: 'Meeting Title' },
      { field: 'meetingDate', header: 'Date' },
      { field: 'meetingTime', header: 'Time' },
      { field: 'meetingVenue', header: 'Venue' },
      { field: 'createdBy', header: 'Organized By' }
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
  }

  onUpdate(event) {
    this.router.navigate(['details'], { relativeTo: this.activatedRoute.parent })
  }
  onRowSelect(event) {
    console.log('event', event);
    this.router.navigate(['details'], { relativeTo: this.activatedRoute.parent })
  }
}
