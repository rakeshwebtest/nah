import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-peoples-list',
  templateUrl: './peoples-list.component.html',
  styleUrls: ['./peoples-list.component.scss'],
})
export class PeoplesListComponent implements OnInit {
  @Input() peoples: any[] = [];
  @Input() label:string;
  constructor() { }

  ngOnInit() {}

}
