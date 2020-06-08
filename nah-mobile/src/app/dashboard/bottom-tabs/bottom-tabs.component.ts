import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GroupCreateModalComponent } from 'src/app/group-create-modal/group-create-modal.component';

@Component({
  selector: 'app-bottom-tabs',
  templateUrl: './bottom-tabs.component.html',
  styleUrls: ['./bottom-tabs.component.scss'],
})
export class BottomTabsComponent implements OnInit {

  constructor(public actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private router:Router) { }

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
      },
      {
        text: 'Group',
        icon: 'people',
        handler: () => {
            this.presentGroupModal();
        }
      }]
    });
    await actionSheet.present();
  }
  async presentGroupModal() {
    const modal = await this.modalController.create({
      component: GroupCreateModalComponent,
      cssClass: 'group-create-modal'
    });
    modal.onDidDismiss().then(arg => {
      
      
    });
    return await modal.present();
  }
}
