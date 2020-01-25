import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  group = {
    name:'',
    followers:[]
  };
  constructor(private storage: Storage) { }

  ngOnInit() {

    this.storage.get('groupDetails').then(res => {
        this.group = res;
    });
  }

}
