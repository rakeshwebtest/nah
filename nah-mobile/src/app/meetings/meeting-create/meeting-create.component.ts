import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { AppHttpClient } from 'src/app/utils';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-meeting-create',
  templateUrl: './meeting-create.component.html',
  styleUrls: ['./meeting-create.component.scss'],
})
export class MeetingCreateComponent implements OnInit {
  title = 'Create A Meeting';
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [{
    key: 'title',
    type: 'input',
    wrappers: ['vertical'],
    className: 'col-12 ion-padding-t-10',
    templateOptions: {
      label: 'Meeting Title',
      placeholder: 'Enter Meeting Title',
      required: true,
    }
  },
  {
    key: 'groupId',
    type: 'select',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      label: 'Say No To',
      placeholder: 'Enter Say No To',
      required: true,
      options: []
    }
  },
  {
    key: 'agenda',
    type: 'textarea',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      required: true,
      label: 'Meeting Information',
      placeholder: 'Enter Meeting Information',
    }
  },
  {
    key: 'location',
    type: 'input',
    wrappers: ['vertical'],
    className: 'col-12 ion-padding-t-10',
    templateOptions: {
      label: 'Location',
      placeholder: 'Enter Meeting Title',
      required: true,
    }
  },
  {
    key: 'cityId',
    type: 'select',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      label: 'Select City',
      placeholder: 'Select City',
      required: true,
      options: []
    }
  },

  {
    key: 'image',
    type: 'file',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      required: true,
      label: 'Image',
      placeholder: 'Upload Image',
    }
  },
  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        key: 'meetingDate',
        type: 'datetime',
        wrappers: ['vertical'],
        className: 'col-6',
        templateOptions: {
          required: true,
          label: 'Start Date',
          placeholder: 'Choose Date',
        }
      },
      {
        key: 'endDate',
        type: 'datetime',
        wrappers: ['vertical'],
        className: 'col-6',
        templateOptions: {
          required: true,
          label: 'End Date',
          placeholder: 'Choose Date',
        }
      },
      {
        key: 'startTime',
        type: 'datetime',
        wrappers: ['vertical'],
        className: 'col-6',
        templateOptions: {
          required: true,
          label: 'Start Time',
          placeholder: 'Choose Time',
          displayFormat: 'hh mm A',
          pickerFormat: 'hh mm A'
        }
      },
      {
        key: 'endTime',
        type: 'datetime',
        wrappers: ['vertical'],
        className: 'col-6',
        templateOptions: {
          required: true,
          label: 'End Time',
          placeholder: 'Choose Time',
          displayFormat: 'hh mm A',
          pickerFormat: 'hh mm A'
        }
      }
    ],
  }
  ];
  groupList = [];
  constructor(private http: AppHttpClient,
    public loadingController: LoadingController,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    const userInfo = this.authService.getUserInfo();
    this.getCities();
    this.http.get('group/list/' + userInfo.id).subscribe(res => {
      console.log(res);
      if (res.data) {
        this.groupList = res.data.map(item => {
          const group = {
            label: item.name,
            value: item.id
          };
          return group;
        })
      }
      this.fields[1].templateOptions.options = this.groupList || [];
    });
  }
  getCities() {
    this.http.get('city/list').subscribe(res => {
      if (res.data) {
        const cityList = res.data.map(item => {
          const city = {
            label: item.name,
            value: item.id
          };
          return city;
        });
        this.fields[4].templateOptions.options = cityList;
      }
      
    });
  }


  async submit(model) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    const userInfo = this.authService.getUserInfo();
    console.log('this.userInfo', userInfo);
    const formData = new FormData();
    // formData.append('file', model.image);
    model.createdBy = userInfo.id;
    for (let key in model) {
      formData.append(key, model[key]);
    }
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    };
    this.http.post('meeting', formData).subscribe(res => {
      console.log('res', res);
      this.router.navigate(['/dashboard'], { queryParams: { reload: true } });
      // window.location.reload();
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }
  async presentLoading(loading) {
    return await loading.present();
  }
}
