import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { AppHttpClient } from 'src/app/utils';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { GroupCreateModalComponent } from 'src/app/group-create-modal/group-create-modal.component';
import { map, startWith, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-meeting-create',
  templateUrl: './meeting-create.component.html',
  styleUrls: ['./meeting-create.component.scss'],
})
export class MeetingCreateComponent implements OnInit {
  title = 'Create A Meeting';
  form = new FormGroup({});
  model: any = {};
  formShow = false;
  maxDate: any = (new Date()).getFullYear() + 3;
  fields: FormlyFieldConfig[] = [
    {
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
    key: 'agenda',
    type: 'textarea',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      required: true,
      maxLength: 1000,
      label: 'Meeting Information (Max size 1000 characters)',
      placeholder: 'Enter Meeting Information',
    }
  },
  {
    key: 'contactMobile',
    type: 'input',
    wrappers: ['vertical'],
    className: 'col-12 ion-padding-t-10',
    templateOptions: {
      type: "number",
      label: 'Mobile Number',
      placeholder: 'Enter Mobile Number',
      required: true,
    }
  },
  {
    key: 'contactEmail',
    type: 'input',
    wrappers: ['vertical'],
    className: 'col-12 ion-padding-t-10',
    templateOptions: {
      label: 'Email',
      placeholder: 'Enter Email',
      required: true,
    }
  },
  {
    fieldGroupClassName: 'row side-by-side-flex',
    fieldGroup: [
      {
        key: 'groupId',
        type: 'selectable',
        wrappers: ['vertical'],
        className: 'flex-auto pr-0',
        templateOptions: {
          label: 'Group',
          placeholder: 'Select Group',
          required: true,
          itemValueField: 'value',
          itemTextField: 'label',
          options: []
        }
      },
      {
        type: 'button',
        className: 'flex ion-text-right ion-padding-t-10',
        templateOptions: {
          label: '',
          text: 'Add Group',
          class: 'ion-color ion-color-danger',
          btnType: 'info',
          type: 'button',
          onClick: ($event) => {
            // this.form.get('someInput').setValue('clicked!');
            this.openGroupModel();
          },
          description: 'These can have labels and stuff too if you want....',
        },
      }
    ]
  },

  {
    key: 'city',
    type: 'selectable',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      label: 'City',
      type: 'city',
      placeholder: 'Select City',
      required: true,
      itemValueField: 'id',
      itemTextField: 'name',
      options: []
    }
  },
  {
    key: 'location',
    type: 'input',
    wrappers: ['vertical'],
    className: 'col-12 ion-padding-t-10',
    templateOptions: {
      label: 'Location',
      placeholder: 'Enter Location',
      required: true,
    }
  },

  {
    key: 'image',
    type: 'file',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      multiple: false,
      required: false,
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
          minDate: this.getCurrentDateString(null),
          maxDate: this.maxDate,
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
          maxDate: this.maxDate
        },
        expressionProperties: {
          'templateOptions.min': (model) => {
            return this.getCurrentDateString(model.meetingDate);
          }
        },
        hooks: {
          onInit: field => {
            const _control = this.form.get('meetingDate');
            _control.valueChanges.subscribe(res => {
              field.formControl.setValue(null)
            });
          }
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
    private modalController: ModalController,
    public loadingController: LoadingController,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute,
    private nativeStorage: Storage,
    private router: Router) { }

  ngOnInit() {
    const userInfo = this.authService.getUserInfo();
    // this.getCities();
    this.http.get('group/list/' + userInfo.id).subscribe(res => {
      if (res.data) {
        this.groupList = res.data.map(item => {
          const group = {
            label: 'Say No To ' + item.name,
            value: item.id
          };
          return group;
        })
      }
      this.fields[4].fieldGroup[0].templateOptions.options = this.groupList || [];
    });
    if (this.activeRoute.snapshot.params.meetingId) {

      this.editMeeting();
    } else {
      this.formShow = true;
    }
  }
  editMeeting() {
    this.title = 'Edit A Meeting';
    this.nativeStorage.get('meeting_edit').then(res => {
      this.model = {
        id: res.id,
        title: res.title,
        agenda: res.agenda,
        contactMobile: res.contactMobile,
        contactEmail: res.contactEmail,
        meetingDate: this.getCurrentDateString(res.meetingDate),
        endDate: res.endDate,
        location: res.location,
        startTime: res.startTime,
        endTime: res.endTime,
        city: res.city,
        groupId: res.group.id,
        imageUrl: res.imageUrl
      }
      this.formShow = true;
    })

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
        this.fields[5].templateOptions.options = res.data || [];//cityList;
      }

    });
  }


  async submit(model, isPublish) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    if (isPublish) {
      model.isPublished = 1;
    } else {
      model.isPublished = 0;
    }
    if (model.city)
      model.cityId = model.city.id;
    const userInfo = this.authService.getUserInfo();
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
      if (res.success) {
        this.router.navigate(['/dashboard/community/meeting/my-meeting'],{ queryParams: { reload: 'true' } });
        // window.location.reload();
        loading.dismiss();
      } else {
        loading.dismiss();
      }
    }, err => {
      loading.dismiss();
      this.router.navigate(['/dashboard'],{ queryParams: { reload: 'true' } });
    });
  }
  async presentLoading(loading) {
    return await loading.present();
  }
  async openGroupModel() {
    const modal = await this.modalController.create({
      component: GroupCreateModalComponent,
      cssClass: 'group-create-modal'
    });
    modal.onDidDismiss().then(arg => {
      // this.getGroups();

      if (arg.data) {
        const group = {
          label: 'Say No To ' + arg.data.name,
          value: arg.data.id
        }
        this.groupList.unshift(group);
        this.form.controls.groupId.setValue(arg.data.id);
      }
      // this.groupC.ngOnInit();
    });
    return await modal.present();
  }
  getCurrentDateString(_date?: Date) {
    let date = new Date();
    if (_date) {
      date = new Date(_date);
    }
    return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }
  getMaxDateString() {
    const date = new Date();
    return (date.getFullYear() + 2) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }
}
