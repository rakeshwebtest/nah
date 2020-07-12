import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/agenda/agenda.service';
import { PostService } from '../post.service';
import { LoadingService } from '../../utils/loading.service';

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
      type: 'input',
      wrappers: ['vertical'],
      className: 'col-12 ion-padding-t-10',
      templateOptions: {
        label: 'Post Title',
        placeholder: 'Type Post Title',
        required: true,
      }
    },
    {
      key: 'description',
      type: 'textarea',
      wrappers: ['vertical'],
      className: 'col-12 ion-padding-t-10',
      templateOptions: {
        label: 'Description',
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
        itemValueField: 'id',
        itemTextField: 'name',
      },
      hooks: {
        onInit: (f) => {
          console.log('this.agendaS.agenda',this.agendaS.agenda);
          f.templateOptions.options = (this.agendaS.agenda) ? this.agendaS.agenda.topics : [];
        }
      }
    },
    {
      key: 'photos',
      type: 'lazy-upload',
      wrappers: ['vertical'],
      className: 'col-12',
      defaultValue: [],
      templateOptions: {
        multiple: true,
        required: false,
        label: 'Image',
        placeholder: 'Upload Image',
      }
    },
    {
      className: 'col-12 ion-margin',
      template: `  
        <b>To copy YouTube videos, you'll need to know just 3 steps:</b>
        <ol class="ion-no-margin ion-no-padding">
          <li>
            Navigate to <a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a> 
          </li>
          <li>
            Upload your video to YouTube Chanel (or) copy the link/URL for the video you want to insert from existing youtube video. 
          </li>
          <li>
            Return to Nah app and Paste the link/URL. Then click "Insert”.
          </li>
        </ol>
       `
    },
    {
      key: 'videos',
      type: 'repeat',
      className: 'col-12',
      defaultValue: [{}],
      templateOptions: {
        addText: 'Add videos'
      },
      // validators: {
      //   required: {
      //     expression: (c) => {
      //       console.log('val', c.value, !c.value || c.value.length < 1);
      //       return !(c.value && c.value.length < 1)
      //     },
      //     message: (error, field: FormlyFieldConfig) => `"minimum one topic"`,
      //   },
      // },
      fieldArray: {
        fieldGroup: [
          {
            wrappers: ['vertical'],
            className: 'repeat-input',
            type: 'input',
            key: 'videoPath',
            templateOptions: {
              pattern: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
              label: 'Paste Youtube URL here',
              placeholder: 'Paste Youtube URL here',
              required: false
            }
          }
        ]
      }
    }

  ];
  formShow = false;
  constructor(private router: Router,
    private agendaS: AgendaService,
    private postS: PostService,
    private loadingService: LoadingService) { }

  ngOnInit() {

  }
  submit(model, isPublish) {
    this.loadingService.show();
    model.isPublished = (isPublish) ? 1 : 0;
    this.postS.createUpdatePost(model).subscribe(res => {
      this.loadingService.hide();
      this.router.navigate(['/dashboard/posts/my-posts']);

    }, error => {
      this.loadingService.hide();
    });
  }

}
