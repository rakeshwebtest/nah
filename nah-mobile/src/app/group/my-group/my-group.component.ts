import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.scss'],
})
export class MyGroupComponent implements OnInit {
  type = this.route.snapshot.data.type || 'all';
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {}

}
