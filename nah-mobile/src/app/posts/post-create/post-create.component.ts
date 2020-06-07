import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'textarea',
      wrappers: ['vertical'],
      className: 'col-12 ion-padding-t-10',
      templateOptions: {
        label: 'Post Title',
        placeholder: 'What\'s on your mind',
        required: true,
      }
    },
    {
      key: 'topicId',
      type: 'selectable',
      wrappers: ['vertical'],
      className: 'flex-auto pr-0',
      templateOptions: {
        label: 'Topic',
        placeholder: 'Select Topic',
        required: true,
        itemValueField: 'value',
        itemTextField: 'label',
        options: []
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

  ];
  formShow = false;
  constructor() { }

  ngOnInit() {}
  submit(model,isPublish){

  }

}
