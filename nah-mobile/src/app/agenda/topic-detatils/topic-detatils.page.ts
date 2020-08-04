import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-topic-detatils',
  templateUrl: './topic-detatils.page.html',
  styleUrls: ['./topic-detatils.page.scss'],
})
export class TopicDetatilsPage implements OnInit {
  topic: any;
  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('topicDetails').then(res => { this.topic = res; });
  }

}
