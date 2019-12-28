import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'theapp-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss']
})
export class MeetingDetailsComponent implements OnInit {
  imgList = [];
  constructor() { }

  ngOnInit() {
    this.imgList = [
      {'url':'../../../../assets/images/hate.png'},
      {'url':'../../../../assets/images/hate.png'},
      {'url':'../../../../assets/images/hate.png'},
      {'url':'../../../../assets/images/hate.png'}
    ];
  }

}
