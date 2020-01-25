import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { AppHttpClient } from '../utils';
import { AuthenticationService } from '../services/authentication.service';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { GroupCreateModalComponent } from '../group-create-modal/group-create-modal.component';
import { Router } from '@angular/router';
import { GroupListComponent } from '../shared/group-list/group-list.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  googlePic: String;
  userInfo: any;
  groupList = [];
  activeTab = "all";
  @ViewChild(GroupListComponent, { static: false }) groupC: GroupListComponent;

  customColors = ['#f00', '#0f0', '#00f', '#800000', '#6b8e23', '#6050dc', '#2d4436', '#003480', '#351d63', '#000000'];
  constructor(private authService: AuthenticationService,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private http: AppHttpClient) { }

  ngOnInit() {
    const userInfo: any = this.authService.isAuthenticated();
    this.userInfo = userInfo.user;
    this.googlePic = userInfo.user.imageUrl;

  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  async presentModal() {
    console.log('0k');
    const modal = await this.modalController.create({
      component: GroupCreateModalComponent,
      cssClass: 'group-create-modal'
    });
    modal.onDidDismiss().then(arg => {
      // this.getGroups();
      console.log('arg', arg);
      if (arg.data)
        this.groupC.ngOnInit();
    });
    return await modal.present();
  }



  navGroupList() {
    this.router.navigate(['/group/list']);
  }
}
