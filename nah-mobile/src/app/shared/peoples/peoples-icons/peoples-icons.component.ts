import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-peoples-icons',
  templateUrl: './peoples-icons.component.html',
  styleUrls: ['./peoples-icons.component.scss'],
})
export class PeoplesIconsComponent implements OnInit {

  @Input() peoples: any[] = [];
  @Input() label:string;
  constructor() { }

  ngOnInit() { }

}
