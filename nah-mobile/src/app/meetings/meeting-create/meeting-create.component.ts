import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-meeting-create',
  templateUrl: './meeting-create.component.html',
  styleUrls: ['./meeting-create.component.scss'],
})
export class MeetingCreateComponent implements OnInit {
  title = 'Create A Meeting';
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [{
    key: 'email',
    type: 'input',
    wrappers: ['vertical'],
    templateOptions: {
      label: 'Email address',
      placeholder: 'Enter email',
      required: true,
    }
  }];
  constructor() { }

  ngOnInit() { }


  submit(model) {
    console.log(model);
  }
}
