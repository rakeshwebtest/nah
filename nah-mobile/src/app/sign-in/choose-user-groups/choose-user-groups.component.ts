import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'theapp-choose-user-groups',
  templateUrl: './choose-user-groups.component.html',
  styleUrls: ['./choose-user-groups.component.scss']
})
export class ChooseUserGroupsComponent implements OnInit {
  groupList = [
    { name: "Hate USA" },
    { name: "Noea of Newyeark" },
    { name: "Hte Modie" },
    { name: "Testing Neo" },
    { name: "Leon of the hearter" },
    { name: "Chek chak aldn" },
    { name: "fa sjlfsd fsajdf" },
    { name: "laldfk asdflsdafsdafl" },

  ];
  constructor() { }

  ngOnInit() {
  }

}
