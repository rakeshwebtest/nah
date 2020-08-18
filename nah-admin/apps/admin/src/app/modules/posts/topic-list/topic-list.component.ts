import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AppHttpClient } from '../../../utils/app-http-client.service';

@Component({
  selector: 'theapp-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  topicList = [];
  cols = [];
  search: string;  
  constructor(private appHttp: AppHttpClient) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Group Name' },
      { field: 'createdBy.displayName', header: 'Created By' }
    ];   
    this.getTopics();
  }
  getTopics() {
    const payload: any = {};
    this.appHttp.get('group/list').subscribe(res => {
      if(res.data) {
        this.topicList = res.data;
      }
    });
  }  
  searchList() {
    this.appHttp.get('group/list?search='+this.search).subscribe(res => {
      if(res.data) {
        this.topicList = res.data;
      }
    });
  }
}
