import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { AppHttpClient } from 'src/app/utils';
import { HttpHeaders } from '@angular/common/http';

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
    key: 'name',
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
    key: 'saynoto',
    type: 'select',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      label: 'Say No To',
      placeholder: 'Enter Say No To',
      required: true,
      options: [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' },
        { value: 3, label: 'Option 3' },
        { value: 4, label: 'Option 4' },
      ]
    }
  },
  {
    key: 'agenda',
    type: 'textarea',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      label: 'Meeting Information',
      placeholder: 'Enter Meeting Information',
    }
  },
  {
    key: 'image',
    type: 'file',
    wrappers: ['vertical'],
    className: 'col-12',
    templateOptions: {
      label: 'Image',
      placeholder: 'Upload Image',
    }
  },
  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        key: 'startDate',
        type: 'datetime',
        wrappers: ['vertical'],
        className: 'col-6',
        templateOptions: {
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
          label: 'End Time',
          placeholder: 'Choose Time',
          displayFormat: 'hh mm A',
          pickerFormat: 'hh mm A'
        }
      }
    ],
  }
  ];
  constructor(private http: AppHttpClient) { }

  ngOnInit() { }


  submit(model) {
    console.log('model',this.model);
    const formData = new FormData();
    formData.append('file', model.image);
    formData.append('title', model.name);
    formData.append('agenda', model.agenda);
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    };
    this.http.post('meeting', formData).subscribe(res => {
      console.log('res', res);
    });
  }
}
