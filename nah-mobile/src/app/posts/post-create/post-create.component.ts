import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';

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
      className: 'col-12',
      templateOptions: {
        label: 'Topic',
        placeholder: 'Select Topic',
        required: true,
        itemValueField: 'value',
        itemTextField: 'label',
        options: [
          {
            label:'topic 1',
            value:1
          },
          {
            label:'topic 2',
            value:2
          }
        ]
      }
    },
    {
      key: 'image',
      type: 'file',
      wrappers: ['vertical'],
      className: 'col-12',
      templateOptions: {
        multiple: true,
        required: false,
        label: 'Image',
        placeholder: 'Upload Image',
      }
    },
    {
      key: 'videoPath',
      type: 'video',
      wrappers: ['vertical'],
      className: 'col-12',
      templateOptions: {
        pattern: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
        label: 'Paste Youtube URL here',
        placeholder: 'Paste Youtube URL here',
        required: true
      }
    }

  ];
  formShow = false;
  constructor(private router:Router) { }

  ngOnInit() {}
  submit(model,isPublish){
    this.router.navigate(['/dashboard/posts/my-posts'])
  }

}
