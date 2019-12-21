import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-group-create-modal',
  templateUrl: './group-create-modal.component.html',
  styleUrls: ['./group-create-modal.component.scss'],
})
export class GroupCreateModalComponent implements OnInit {

  newGroupName:string;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {

  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
