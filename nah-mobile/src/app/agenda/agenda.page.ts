import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AppHttpClient } from '../utils';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  model:any = {
    isPublish:0,
    topics:[
      {},
      {}
    ]
  };
  isPublish = 0;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'topics',
      type: 'repeat',
      templateOptions: {
        addText: 'Add another topic',
        max:2
      },
      validators: {
        required: {
          expression: (c) =>{
            console.log('val',c.value,!c.value || c.value.length < 1);
            return !(c.value && c.value.length < 1) },
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
  constructor(private http:AppHttpClient) { }

  ngOnInit() {
    this.getUserAgenda();
  }
  // get user agenda if exist
  getUserAgenda(){
    this.http.get('agenda').subscribe(res=>{
      if(res.data){
        this.model = res.data;
        this.isPublish = res.data.isPublish;
      }
    })
  }
  submit(saveType){
    if(saveType === 'publish'){
      this.model.isPublish = 1;
    }else{
      this.model.isPublish = 0;
    }
    console.log('this.model',this.model);
    this.http.post('agenda',this.model).subscribe(res=>{
      if(res.data){
        this.isPublish = res.data.isPublish;
        this.model = res.data;
        console.log(res.data);
      }
    })
  }

}
