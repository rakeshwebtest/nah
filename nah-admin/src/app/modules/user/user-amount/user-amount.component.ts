import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AppHttpClient } from '../../../utils/app-http-client.service';
import { API_CONFIG } from '../../../utils/api-config';
import { LocalStorageService } from '../../../utils/local-storage.service';

@Component({
  selector: 'theapp-user-amount',
  templateUrl: './user-amount.component.html',
  styleUrls: ['./user-amount.component.scss']
})
export class UserAmountComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  userCreditDebitInfo: any = {};
  sessionInfo: any = {};
  users: any = [];
  options:FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          key: 'user',
          type: 'select',
          wrappers:['horizontal-field'],
          templateOptions: {
            label: 'Users',
            placeholder: 'Select User',
            required: true,
            options: this.users,
            valueProp: 'userId',
            labelProp: 'userName',
          },
        },
        {
          className: 'col-12',
          key: 'amount',
          type: 'input',
          wrappers:['horizontal-field'],
          templateOptions: {
            type: 'number',
            label: 'Amount',
            placeholder: 'Enter number',
            required: true
          }
        }
      ]
    }
  ];

  constructor(private appHttp: AppHttpClient, private ls: LocalStorageService) {
    this.sessionInfo = this.ls.getItem('user', true);
  }

  ngOnInit() {
    this.sessionInfo = this.ls.getItem('user', true);
    // this.getUserCreditDebitInfo();
    this.getUsers();
  }
  
  getUsers() {
    const payload: any = {};
    payload.command = "getUsers";
    payload.requestData = { userId: this.sessionInfo.userId };
    // this.appHttp.get('jsonBlob/0c0a79ea-ed8f-11e9-bf4f-d5a1e81edf67').subscribe(res => {
    this.appHttp.post(API_CONFIG.ADD_USER, payload).subscribe(res => {
      if(res.data) {
        this.users = res.data;
        this.fields[0].templateOptions.options = res.data;
        return res.data;
      }
    });
  }
  getUserCreditDebitInfo() {
    const payload: any = {};
    payload.command = 'initCreditAndDebitForm';
    payload.requestData = { userId: this.sessionInfo.userId, userType: this.sessionInfo.userType };
    this.appHttp.post(API_CONFIG.USER_WALLET, payload).subscribe(res => {
      if (res.data) {
        this.userCreditDebitInfo = res.data;
      }
    });
  }

  creditAmount() {
    if(this.form.valid) {
      const payload: any = {};
      payload.command = "creditAmount";
      payload.requestData = {userId: this.model.user, credit: this.model.amount, updatedBy: this.sessionInfo.userId};
      this.options.resetModel();

      this.appHttp.post(API_CONFIG.USER_WALLET, payload).subscribe(res => {
        console.log('res', res);
      });
    }   
  }

  debitAmount() {
    if(this.form.valid) {
      const payload: any = {};
      payload.command = "debitAmount";
      payload.requestData = {userId: this.model.user, debit: this.model.amount, updatedBy: this.sessionInfo.userId};
      this.options.resetModel();

      this.appHttp.post(API_CONFIG.USER_WALLET, payload).subscribe(res => {
        console.log('res', res);
      });
    }
   
  }

  // submit(data: any) {
  //   let payload: any = {};
  //   payload = data;
  //   payload.userType = this.userInfo.userType;
  //   payload.userId = this.sessionInfo.userId;
  //   payload.agentId = this.sessionInfo.userId;
  //   payload.updatedBy = this.sessionInfo.userId;
  //   console.log('user payload', payload);
  //   this.appHttp.post(API_CONFIG.ADD_USER, payload).subscribe(res => {
  //     console.log('res', res);
  //   });
  // }
}
