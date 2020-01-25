import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-peoples-list',
  templateUrl: './peoples-list.component.html',
  styleUrls: ['./peoples-list.component.scss'],
})
export class PeoplesListComponent implements OnInit {
  @Input() peoples: any[] = [];
  @Input() label: string;
  constructor(public modalController: ModalController) { }

  ngOnInit() { }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
