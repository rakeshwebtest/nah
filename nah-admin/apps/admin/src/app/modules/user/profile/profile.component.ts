import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AppHttpClient } from '../../../utils/app-http-client.service';
import { LocalStorageService } from '../../../utils/local-storage.service';
import { Router } from '@angular/router';
import { API_CONFIG } from '../../../utils/api-config';


@Component({
  selector: 'theapp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  userInfo: any = {};
  sessionInfo: any = {};
  options: FormlyFormOptions = {
  };
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
            required: true,
            disabled: true
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
            required: true,
            disabled: true
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
            disabled: true
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
      this.model = this.sessionInfo;
    }

  ngOnInit() {
  }

  submit(data: any) {
    const payload: any = {};
    let requestData: any = {};
    payload.command = 'updateUserProfile';
    requestData.userId = this.sessionInfo.userId;
    requestData.updatedBy = this.sessionInfo.updatedBy;
    requestData.userName = data.userName;
    requestData.mobileNumber = data.mobileNumber;
    requestData.emailId = data.emailId;
    payload.requestData = requestData;
    if (this.form.valid) {
      this.appHttp.post(API_CONFIG.ADD_USER, payload).subscribe(res => {
        if (res.success) {
          this.ls.setItem('user', data, true);
          this.router.navigate(['/admin/dashboard']);
        }
      });
    }

  }
}
