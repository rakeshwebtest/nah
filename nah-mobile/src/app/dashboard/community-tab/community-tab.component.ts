import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-tab',
  templateUrl: './community-tab.component.html',
  styleUrls: ['./community-tab.component.scss'],
})
export class CommunityTabComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

}
