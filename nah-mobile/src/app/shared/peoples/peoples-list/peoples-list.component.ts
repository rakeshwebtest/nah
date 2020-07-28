import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peoples-list',
  templateUrl: './peoples-list.component.html',
  styleUrls: ['./peoples-list.component.scss'],
})
export class PeoplesListComponent implements OnInit {
  @Input() peoples: any[] = [];
  @Input() label: string;
  constructor(public modalController: ModalController, private router: Router) { }

  ngOnInit() { }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  navProfile(user) {
    if (user.user.id) {
      this.router.navigate(['/user-profile/' + user.user.id]);
    }
  }


}
