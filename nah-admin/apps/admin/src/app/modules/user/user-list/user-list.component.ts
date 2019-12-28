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
  userOptions: FormlyFormOptions = {
  };
  showForm = false;
  userFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12 col-md-6',
          key: 'userId',
          type: 'input',
          wrappers: ['horizontal-field'],
          templateOptions: {
            label: 'User ID',
            placeholder: 'Enter User ID',
            required: true,
            readonly: true
          }
        },
        {
          className: 'col-12 col-md-6',
          key: 'userName',
          type: 'input',
          wrappers: ['horizontal-field'],
          templateOptions: {
            attributes: {
              autocomplete: 'off',
            },
            label: 'User Name',
            placeholder: 'Enter User Name',
            required: true
          },
        },
        {
          className: 'col-12 col-md-6',
          key: 'mobileNumber',
          type: 'input',
          wrappers: ['horizontal-field'],
          templateOptions: {
            type: 'number',
            label: 'Mobile Number',
            placeholder: 'Enter Mobile Number',
            required: true
          }
        },
        {
          className: 'col-12 col-md-6',
          key: 'emailId',
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
          key: 'maxProfitMatch',
          type: 'input',
          wrappers: ['horizontal-field'],
          templateOptions: {
            type: 'number',
            label: 'Max Profit Match',
            placeholder: 'Enter number',
            required: true
          }
        },
        {
          className: 'col-12 col-md-6',
          key: 'maxProfitFancy',
          type: 'input',
          wrappers: ['horizontal-field'],
          // defaultValue: 20,
          templateOptions: {
            type: 'number',
            label: 'Max Profit Fancy',
            placeholder: 'Enter number',
            required: true,
            //  max: 200
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
    // this.sessionInfo = this.ls.getItem('user', true);
    // const payload = {
    //   "command": "getUsers",
    //   "requestData": {
    //     "userId": this.sessionInfo.userId
    //   }
    // };

    // this.appHttp.post(API_CONFIG.USER_LIST, payload).subscribe(res => {
    //   this.userList = res.data || [];
    // });
    this.cols = [
      { field: 'userId', header: 'User Id' },
      { field: 'userName', header: 'User Name' },
      { field: 'userType', header: 'User Type' }
    ];
    this.userList = [
      {
        'userId': 1,'userName': 'Raja','userType': 'admin'
      },
      {
        'userId': 2,'userName': 'Mohan','userType': 'admin'
      },
      {
        'userId': 3,'userName': 'Rakesh','userType': 'admin'
      }
    ];
  }
  //start create / debit amout
  getUserCreditDebitInfo() {
    const payload: any = {};
    payload.command = 'initCreditAndDebitForm';
    payload.requestData = { userId: this.sessionInfo.userId, userType: this.sessionInfo.userType };
    return this.appHttp.post(API_CONFIG.USER_WALLET, payload);
  }
  onCreditDebitAmount(creditAmount, type: 'Credit' | 'Debit', row) {
    this.model.amount = 0;
    this.model.user = row.userId;
    this.modalTitle = type;
    this.amoutType = (type === 'Credit') ? 'creditAmount' : 'debitAmount';
    this.getUserCreditDebitInfo().subscribe(res => {
      // set max min value of field amout
      //  this.fields[0].fieldGroup[5].templateOptions.max = this.userInfo.maxProfitMatch; // defaultValue
      this.fields[0].fieldGroup[0].templateOptions.min = 1;

      if (res.data) {
        console.log('res.data', res.data);
        if (type === 'Credit') {
          this.fields[0].fieldGroup[0].templateOptions.max = res.data.credit;
          this.fields[0].fieldGroup[0].templateOptions.description = 'Max Credit Amount ' + res.data.credit;
          this.model.amount = res.data.credit;
        } else {
          this.fields[0].fieldGroup[0].templateOptions.max = res.data.debit;
          this.fields[0].fieldGroup[0].templateOptions.description = 'Max Debit Amount ' + res.data.debit;

          this.model.amount = res.data.debit;
        }
      }
      this.modalRef = this.modalService.open(creditAmount, {});
    });

  }
  addAmount() {
    if (this.form.valid) {
      const payload: any = {};
      payload.command = this.amoutType;
      payload.requestData = { userId: this.model.user, updatedBy: this.sessionInfo.userId };
      if (this.amoutType === 'creditAmount')
        payload.requestData.credit = this.model.amount;
      if (this.amoutType === 'debitAmount')
        payload.requestData.debit = this.model.amount;
      if (this.form.valid) {
        this.appHttp.post(API_CONFIG.USER_WALLET, payload).subscribe(res => {
          this.modalRef.close();
          this.headerInfo.updateHeaderInfo();
        });
      }

    }
  }
  updateUser(updateUserTemp, user) {
    this.userModel = user;
    const payload: any = {};
    payload.command = 'initCreateUserForm';
    // payload.requestData = { userId: this.sessionInfo.userId, userType: this.sessionInfo.userType };
    payload.requestData = { userId: user.userId, userType: user.userType };
    // this.appHttp.get('jsonBlob/d1d9879e-ed88-11e9-bf4f-1b7660dce7d0').subscribe(res => {
    this.appHttp.post(API_CONFIG.ADD_USER, payload).subscribe(res => {
      if (res.data) {
        this.userInfo = res.data;
        this.userFields[0].fieldGroup[4].templateOptions.max = this.userInfo.maxProfitMatch; // defaultValue
        this.userFields[0].fieldGroup[4].templateOptions.description = 'Max Profit Match :' + this.userInfo.maxProfitMatch; // defaultValue
        this.userFields[0].fieldGroup[4].templateOptions.min = 0;
        this.userFields[0].fieldGroup[5].templateOptions.max = this.userInfo.maxProfitFancy;
        this.userFields[0].fieldGroup[5].templateOptions.description = 'Max Profit Fancy :' + this.userInfo.maxProfitFancy;
        this.userFields[0].fieldGroup[5].templateOptions.min = 0;
        this.userFields[0].fieldGroup[4].defaultValue = 1;
        // this.model.maxProfitMatch = userInfo.maxProfitMatch;
        // this.model.maxProfitFancy = userInfo.maxProfitFancy;

        console.log('this.fields -->', this.fields[0].fieldGroup[4]);
        this.showForm = true;
      }
    });
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
    const suspendUsers: any = [];
    this.selectedUsers.forEach(user => {
      suspendUsers.push({userId: user.userId, updatedBy: this.sessionInfo.userId});
    });
    this.suspendUsers(suspendUsers);
  }
  activate() {
    const activateUsers: any = [];
    this.selectedUsers.forEach(user => {
      activateUsers.push({userId: user.userId, updatedBy: this.sessionInfo.userId});
    });
    this.activateUsers(activateUsers);
  }

  suspendUsers(users?: []) {
    const payload: any = {};
    let requestData: any = {};
    payload.command = 'suspendUsers';
    requestData = users;
    payload.requestData = requestData;
    this.appHttp.post(API_CONFIG.ADD_USER, payload).subscribe(res => {
      if (res.success) {
        this.selectedUsers = [];
        this.ngOnInit();
      }
    });
  }
  
  activateUsers(users?: []) {
    const payload: any = {};
    let requestData: any = {};
    payload.command = 'activateUsers';
    requestData = users;
    payload.requestData = requestData;
    this.appHttp.post(API_CONFIG.ADD_USER, payload).subscribe(res => {
      if (res.success) {
        this.selectedUsers = [];
        this.ngOnInit();
      }
    });
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
