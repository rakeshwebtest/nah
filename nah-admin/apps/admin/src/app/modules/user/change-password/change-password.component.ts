import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AppHttpClient } from '../../../utils/app-http-client.service';
import { LocalStorageService } from '../../../utils/local-storage.service';
import { Router } from '@angular/router';
import { API_CONFIG } from '../../../utils/api-config';


@Component({
  selector: 'theapp-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  sessionInfo: any = {};
  options: FormlyFormOptions = {
  };
  fields: FormlyFieldConfig[] = [{
    key: 'password',
    validators: {
      fieldMatch: {
        expression: (control) => {
          const value = control.value;

          return value.passwordConfirm === value.password
            // avoid displaying the message error when values are empty
            || (!value.passwordConfirm || !value.password);
        },
        message: 'Password Not Matching',
        errorPath: 'passwordConfirm',
      },
    },
    fieldGroup: [
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Password',
          placeholder: 'Must be at least 3 characters',
          required: true,
          minLength: 3,
        },
      },
      {
        key: 'passwordConfirm',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Confirm Password',
          placeholder: 'Please re-enter your password',
          required: true,
        },
      },
    ],
  }];

  constructor(private appHttp: AppHttpClient,
    private router: Router,
    private ls: LocalStorageService) {
      this.sessionInfo = this.ls.getItem('user', true);
    }

  ngOnInit() {
  }

  submit(data: any) {
    const payload: any = {};   
    payload.password = data.password.password;  
    if (this.form.valid) {
      this.appHttp.put('user/changePassword', payload).subscribe(res => {
       
      });
    }

  }

}
