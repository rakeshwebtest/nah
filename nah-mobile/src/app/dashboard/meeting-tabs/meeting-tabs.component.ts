import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-tabs',
  templateUrl: './meeting-tabs.component.html',
  styleUrls: ['./meeting-tabs.component.scss'],
})
export class MeetingTabsComponent implements OnInit {
  activeTab = 'type/all';
  constructor() { }

  ngOnInit() {}
}
