import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-tabs',
  templateUrl: './bottom-tabs.component.html',
  styleUrls: ['./bottom-tabs.component.scss'],
})
export class BottomTabsComponent implements OnInit {

  constructor(public actionSheetController: ActionSheetController,private router:Router) { }

  ngOnInit() {}
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Create New',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Meeting',
        role: 'destructive',
        icon: 'people',
        handler: () => {
          this.router.navigate(['/meeting/create']);
          console.log('Delete clicked');
        }
      }, {
        text: 'Post',
        icon: 'send',
        handler: () => {
          this.router.navigate(['/posts/create']);
          console.log('Share clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
