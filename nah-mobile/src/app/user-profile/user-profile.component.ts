import { Component, OnInit } from '@angular/core';
import { UserConfigService } from '../utils/user-config.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  googlePic: String;
  userInfo:any;
  constructor(private userConfigService: UserConfigService,private popoverController:PopoverController) { }

  ngOnInit() {
    this.userInfo = this.userConfigService.user.user;
    this.googlePic = this.userConfigService.user.user.imageUrl;
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: null,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  // presentPopover(myEvent) {
  //   let popover = this.popoverController.create(PopoverPage);
  //   popover.present({
  //     ev: myEvent
  //   });
  // }

}
