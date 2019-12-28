import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AppHttpClient } from '../../../utils/app-http-client.service';
import { API_CONFIG } from '../../../utils/api-config';
import { LocalStorageService } from '../../../utils/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'theapp-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  userInfo: any = {};
  sessionInfo: any = {};
  options: FormlyFormOptions = {
  };
  showForm = false;
  fields: FormlyFieldConfig[] = [
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
            required: true
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
          key: 'password',
          type: 'input',
          wrappers: ['horizontal-field'],
          templateOptions: {
            attributes: {
              autocomplete: 'off',
            },
            type: 'password',
            label: 'Password',
            placeholder: 'Enter Password',
            required: true
          }
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


  constructor(private appHttp: AppHttpClient,
    private router: Router,
    private ls: LocalStorageService) {
    this.sessionInfo = this.ls.getItem('user', true);
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    const payload: any = {};
    payload.command = 'initCreateUserForm';
    payload.requestData = { userId: this.sessionInfo.userId, userType: this.sessionInfo.userType };
    // this.appHttp.get('jsonBlob/d1d9879e-ed88-11e9-bf4f-1b7660dce7d0').subscribe(res => {
    this.appHttp.post(API_CONFIG.ADD_USER, payload).subscribe(res => {
      if (res.data) {
        this.userInfo = res.data;
        this.fields[0].fieldGroup[5].templateOptions.max = this.userInfo.maxProfitMatch; // defaultValue
        this.fields[0].fieldGroup[5].templateOptions.description = 'Max Profit Match :' + this.userInfo.maxProfitMatch; // defaultValue
        this.fields[0].fieldGroup[5].templateOptions.min = 0;
        this.fields[0].fieldGroup[6].templateOptions.max = this.userInfo.maxProfitFancy;
        this.fields[0].fieldGroup[6].templateOptions.description = 'Max Profit Fancy :' + this.userInfo.maxProfitFancy;
        this.fields[0].fieldGroup[6].templateOptions.min = 0;
        this.fields[0].fieldGroup[5].defaultValue = 1;
        this.model.maxProfitMatch = this.userInfo.maxProfitMatch;
        this.model.maxProfitFancy = this.userInfo.maxProfitFancy;

        console.log('this.fields -->', this.fields[0].fieldGroup[5]);
        this.showForm = true;
      }
    });
  }

  submit(data: any) {
    const payload: any = {};
    let requestData: any = {};
    payload.command = 'createUser';
    requestData = data;
    requestData.userType = this.userInfo.userType;
    // requestData.userId = this.userInfo.userId;
    requestData.agentId = this.userInfo.agentId;
    requestData.updatedBy = this.userInfo.updatedBy;
    payload.requestData = requestData;
    console.log('user payload', payload);
    if (this.form.valid) {
      this.appHttp.post(API_CONFIG.ADD_USER, payload).subscribe(res => {
        if (res.success) {
          this.router.navigate(['/admin/user/list']);
        }
      });
    }

  }
}
