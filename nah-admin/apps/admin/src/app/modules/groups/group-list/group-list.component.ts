import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AppHttpClient } from '../../../utils/app-http-client.service';

@Component({
  selector: 'theapp-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groupList = [];
  cols = [];
  modalRef: NgbModalRef;
  // creadit || debit info
  selectedCity:any;
  modalTitle: string;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  amoutType: string;
  model: any = {};
  userCreditDebitInfo: any = {};
  sessionInfo: any = {};
  users: any = [];
  userInfo: any = {};
  search: string;
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          key: 'groupName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Say No To',
            description: '',
            placeholder: 'Enter Group Name',
            required: true
          }
        }
      ]
    }
  ];
  constructor(private modalService:NgbModal, private appHttp: AppHttpClient) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Group Name' },
      { field: 'createdBy.displayName', header: 'Created By' }
    ];
    // this.groupList = [
    //   {
    //     'name': 'Say No To Trump','createdBy': 'Mohan Babu'
    //   },
    //   {
    //     'name': 'Say No To Veg','createdBy': 'prasad duggirala'
    //   },
    //   {
    //     'name': 'Say No To Plastic','createdBy': 'UZ 16LAB'
    //   }
    // ];
    this.getGroups();
  }
  getGroups() {
    const payload: any = {};
    this.appHttp.get('group/list').subscribe(res => {
      if(res.data) {
        this.groupList = res.data;
      }
    });
  }
  onAddGroup(addGroup) {
      this.modalRef = this.modalService.open(addGroup, {});
  }
  updateGroup(addGroup) {
      this.modalRef = this.modalService.open(addGroup, {});
  }
  searchList() {
    this.appHttp.get('group/list?search='+this.search).subscribe(res => {
      if(res.data) {
        this.groupList = res.data;
      }
    });
  }
}
