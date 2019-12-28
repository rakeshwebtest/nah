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
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          key: 'meetingName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Meeting Name',
            description: '',
            placeholder: 'Enter Meeting Name',
            required: true
          }
        }
      ]
    }
  ];
  constructor(private modalService: NgbModal, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cols = [
      { field: 'meetingId', header: 'Meeting Id' },
      { field: 'meetingName', header: 'Meeting Name' },
      { field: 'meetingType', header: 'Meeting Type' }
    ];
    this.meetingList = [
      {
        'meetingId': 1,'meetingName': 'Raja','meetingType': 'admin'
      },
      {
        'meetingId': 2,'meetingName': 'Mohan','meetingType': 'admin'
      },
      {
        'meetingId': 3,'meetingName': 'Rakesh','meetingType': 'admin'
      }
    ];
  }
  onAdd(addMeeting) {
    this.modalRef = this.modalService.open(addMeeting, {});
}
onUpdate(addMeeting) {
    this.modalRef = this.modalService.open(addMeeting, {});
}
onRowSelect(event) {
console.log('event', event);
this.router.navigate(['details'], {relativeTo: this.activatedRoute.parent})
}
}
