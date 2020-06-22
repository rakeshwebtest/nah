import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AppHttpClient } from '../utils';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendaService } from './agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  model: any = {
    isPublish: 0,
    topics: [
      {},
      {}
    ]
  };
  isPublish = 0;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      wrappers: ['vertical'],
      className: '',
      templateOptions: {
        label: 'Title',
        placeholder: 'Entet Title'
      }
    },
    {
      key: 'topics',
      type: 'repeat',
      templateOptions: {
        addText: 'Add another topic',
        max: 2
      },
      validators: {
        required: {
          expression: (c) => {
            console.log('val', c.value, !c.value || c.value.length < 1);
            return !(c.value && c.value.length < 1)
          },
          message: (error, field: FormlyFieldConfig) => `"minimum one topic"`,
        },
      },
      validation: {
        show: true,
      },
      fieldArray: {
        fieldGroup: [
          {
            wrappers: ['vertical'],
            className: 'repeat-input',
            type: 'input',
            key: 'name',
            templateOptions: {
              label: 'Say To No',
              required: true,
            }
          }
        ]
      }
    }
  ];
  constructor(private http: AppHttpClient, private router: Router, private activeRouter: ActivatedRoute, private agendaService: AgendaService) { }

  ngOnInit() {
    if (this.activeRouter.snapshot.params.id) {
      this.getUserAgenda(this.activeRouter.snapshot.params.id);
    }
    // this.getUserAgenda();
  }
  // get user agenda if exist
  getUserAgenda(id) {
    this.http.get('agenda?agendaId=' + id).subscribe(res => {
      if (res.data) {
        this.model = res.data;
        this.isPublish = res.data.isPublish;
      }
    })
  }
  submit(saveType) {
    if (saveType === 'publish') {
      this.model.isPublish = 1;
    } else {
      this.model.isPublish = 0;
    }
    this.http.post('agenda', this.model).subscribe(res => {
      if (res.data) {
        this.isPublish = res.data.isPublish;
        this.model = res.data;
        console.log(res.data);
        if (saveType === 'publish') {
          this.agendaService.checkAgenda();
        }
        this.router.navigate(['/dashboard/posts/all']);
      }
    })
  }

}
