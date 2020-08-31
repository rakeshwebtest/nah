import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendaService } from 'src/app/agenda/agenda.service';
import { PostService } from '../post.service';
import { LoadingService } from '../../utils/loading.service';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {

  browser: any;
  form = new FormGroup({});
  model: any = {};
  showForm = true;
  headerTitle = 'Create Post';
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      wrappers: ['vertical'],
      className: 'col-12 ion-padding-t-10',
      templateOptions: {
        label: 'Post Title',
        placeholder: 'Enter post title',
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
        placeholder: 'What\'s on your mind?',
        required: true,
        rows: 5
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
          console.log('this.agendaS.agenda', this.agendaS.agenda);
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
    }
  ];
  fields2: FormlyFieldConfig[] = [
    {
      key: 'videos',
      type: 'repeat',
      className: 'col-12',
      defaultValue: [{}],
      templateOptions: {
        addText: 'Add videos',
        color: 'light',
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
  constructor(
    private iab: InAppBrowser,
    private router: Router,
    private agendaS: AgendaService,
    private activatedRoute: ActivatedRoute,
    private postS: PostService,
    private storage: Storage,
    private platform: Platform,
    private loadingService: LoadingService) {

    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   if (this.browser) {
    //     this.browser.close();
    //   }
    // });
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.postId) {
      this.headerTitle = 'Edit Post';
      this.storage.get('postDetails').then(res => {
        if (this.activatedRoute.snapshot.params.postId == res.id) {
          console.log('this.model', res);
          this.model = res;
          if (res.topic) {
            this.model.topicId = res.topic.id;
          }
        }
      });
    }
  }

  submit(model, isPublish) {
    this.loadingService.show();
    model.isPublished = (isPublish) ? 1 : 0;
    this.postS.createUpdatePost(model).subscribe(res => {
      this.loadingService.hide();
      this.router.navigateByUrl('/dashboard/posts');
      this.postS.postReload();
      // this.router.navigate(['/dashboard/posts'], { queryParams: { postReload: true } });
    }, error => {
      this.loadingService.hide();
    });
  }
  openWeb() {
    // window.open('https://www.youtube.com/', '_blank');
    this.browser = this.iab.create('https://www.youtube.com/', '_system', { location: 'yes', hardwareback: 'yes', toolbar: 'yes' });
    this.browser.show();
  }

}
