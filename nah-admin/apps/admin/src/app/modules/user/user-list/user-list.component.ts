import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppHttpClient } from '../../../utils/app-http-client.service';
import { API_CONFIG } from '../../../utils/api-config';
import { LocalStorageService } from '../../../utils/local-storage.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { HeaderInfoService } from '../../../services/header-info.service';

@Component({
  selector: 'theapp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  //user form
  userForm = new FormGroup({});
  userModel: any = {};
  selectedCity:any;
  userOptions: FormlyFormOptions = {
  };
  showForm = false;
  userFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12 col-md-6',
          key: 'name',
          type: 'input',
          wrappers: ['horizontal-field'],
          templateOptions: {
            attributes: {
              autocomplete: 'off',
            },
            label: 'Name',
            placeholder: 'Enter User Name',
            required: true
          },
        },        
        {
          className: 'col-12 col-md-6',
          key: 'email',
          type: 'input',
          wrappers: ['horizontal-field'],
          templateOptions: {
            type: 'email',
            label: 'Email address',
            placeholder: 'Enter Email'
          }
        },
        {
          className: 'col-12 col-md-6',
          key: 'typeOfNoer',
          type: 'select',
          wrappers: ['horizontal-field'],
          templateOptions: {
            label: 'Type Of Noer',
            options: [
              {
                label: 'Anties',
                value: 'anties'
              },
              {
                label: 'Hater',
                value: 'hater'
              }
            ]
          }
        }        
      ]
    }

  ];


  //end user



  userList = [];
  cols = [];
  selectedUsers = [];
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
  cities: any = [];
  noerTypes: any = [];
  userInfo: any = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          key: 'amount',
          type: 'input',
          wrappers: ['horizontal-field'],
          templateOptions: {
            type: 'number',
            label: 'Amount',
            description: '',
            placeholder: 'Enter Amount',
            required: true
          }
        }
      ]
    }
  ];



  constructor(private appHttp: AppHttpClient, private ls: LocalStorageService,
    private headerInfo: HeaderInfoService,
    private modalService: NgbModal) { }

  ngOnInit() {
  
    this.cols = [
      { field: 'email', header: 'Email' },
      { field: 'typeOfNoer', header: 'Type Of Noer' },
      { field: 'city', header: 'City' },
    ];
    this.userList = [
      {
        'image':'assets/images/default-user.png', 'name': 'Mohan Babu','email': 'palaekirimohanbabu@gmail.com','typeOfNoer': 'anties', 'city': 'New York'
      },
      {
        'image':'assets/images/user-1.jpg', 'name': 'prasad duggirala','email': 'prasadduggirala2@gmail.com','typeOfNoer': 'hater', 'city': 'Los Angeles', active: true
      },
      {
        'image':'assets/images/user-2.jpg', 'name': 'UZ 16LAB','email': 'uzveda115@gmail.com','typeOfNoer': 'anties', 'city': 'Chicago'
      }
    ];
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Los Angeles', code: 'LA'},
      {name: 'Chicago', code: 'CH'}
    ];
    this.noerTypes = [
      {name: 'Anties', code: 'AN'},
      {name: 'Hater', code: 'HA'},
      {name: 'Rejector', code: 'RJ'}
    ];
    this.getUsers();

  }
 
  getUsers() {
    const payload: any = {};
    this.appHttp.get('user/list').subscribe(res => {
      console.log('users list', res);
      if(res.data) {
        this.userList = res.data;
      }
    });
  }
 
  updateUser(updateUserTemp, user) {
    this.userModel = user;
    const payload: any = {};   
    this.showForm = true;
    this.modalRef = this.modalService.open(updateUserTemp, { size: 'lg' });
  }
  userSubmit(data) {
    const payload: any = {};
    let requestData: any = {};
    payload.command = 'updateUser';
    requestData = {
      userId: data.userId,
      userName: data.userName,
      mobileNumber: data.mobileNumber,
      emailId: data.emailId,
      maxProfitMatch: data.maxProfitMatch,
      maxProfitFancy: data.maxProfitFancy,
      updatedBy: this.sessionInfo.userId,
    };
    requestData.userType = this.userInfo.userType;
    // requestData.userId = this.userInfo.userId;
    requestData.agentId = this.userInfo.agentId;
    requestData.updatedBy = this.userInfo.updatedBy;
    payload.requestData = requestData;
    console.log('user payload', payload);
    if (this.form.valid) {
      this.appHttp.post(API_CONFIG.ADD_USER, payload).subscribe(res => {
        if (res.success) {
          this.modalRef.close();
          this.ngOnInit();
        }
      });
    }

  }
  suspend() {
    // const suspendUsers: any = [];
    // this.selectedUsers.forEach(user => {
    //   suspendUsers.push({userId: user.userId, updatedBy: this.sessionInfo.userId});
    // });
    // this.suspendUsers(suspendUsers);
  }
  activate() {
    // const activateUsers: any = [];
    // this.selectedUsers.forEach(user => {
    //   activateUsers.push({userId: user.userId, updatedBy: this.sessionInfo.userId});
    // });
    // this.activateUsers(activateUsers);
  }

  suspendUsers(users?: []) {
    // const payload: any = {};
    // let requestData: any = {};
    // payload.command = 'suspendUsers';
    // requestData = users;
    // payload.requestData = requestData;
    // this.appHttp.post(API_CONFIG.ADD_USER, payload).subscribe(res => {
    //   if (res.success) {
    //     this.selectedUsers = [];
    //     this.ngOnInit();
    //   }
    // });
  }
  
  activateUsers(users?: []) {
    // const payload: any = {};
    // let requestData: any = {};
    // payload.command = 'activateUsers';
    // requestData = users;
    // payload.requestData = requestData;
    // this.appHttp.post(API_CONFIG.ADD_USER, payload).subscribe(res => {
    //   if (res.success) {
    //     this.selectedUsers = [];
    //     this.ngOnInit();
    //   }
    // });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.eventDetails$.unsubscribe();
    if (this.modalRef) {
      this.modalRef.close();
    }

  }
}
