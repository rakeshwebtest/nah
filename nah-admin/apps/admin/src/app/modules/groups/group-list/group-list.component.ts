import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

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
  constructor(private modalService:NgbModal) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Group Name' },
      { field: 'createdBy', header: 'Created By' }
    ];
    this.groupList = [
      {
        'name': 'Say No To Trump','createdBy': 'Mohan Babu'
      },
      {
        'name': 'Say No To Veg','createdBy': 'prasad duggirala'
      },
      {
        'name': 'Say No To Plastic','createdBy': 'UZ 16LAB'
      }
    ];
  }
  onAddGroup(addGroup) {
      this.modalRef = this.modalService.open(addGroup, {});
  }
  updateGroup(addGroup) {
      this.modalRef = this.modalService.open(addGroup, {});
  }
}
