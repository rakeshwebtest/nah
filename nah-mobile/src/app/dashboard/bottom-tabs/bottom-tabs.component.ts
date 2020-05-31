import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-bottom-tabs',
  templateUrl: './bottom-tabs.component.html',
  styleUrls: ['./bottom-tabs.component.scss'],
})
export class BottomTabsComponent implements OnInit {

  constructor(public actionSheetController: ActionSheetController) { }

  ngOnInit() {}
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Create Meeting',
        role: 'destructive',
        icon: 'people',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Create Post',
        icon: 'send',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Create Group',
        icon: 'albums',
        handler: () => {
          console.log('Play clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
