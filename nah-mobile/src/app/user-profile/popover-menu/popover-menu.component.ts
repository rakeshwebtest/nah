import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import { AppRate } from '@ionic-native/app-rate/ngx';
// import { LaunchReview } from '@ionic-native/launch-review/ngx';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {


  constructor(private authService: AuthenticationService,
    private googlePlus: GooglePlus,
    private router: Router, private popoverController: PopoverController) { }

  ngOnInit() { }
  logout() {
    this.DismissClick();
    this.googlePlus.logout();
    this.authService.logout();
  }
  async DismissClick() {
    await this.popoverController.dismiss();
  }

  navPage(url){
    this.router.navigate([url]);
    this.DismissClick();
  }
  feedback() {
    // this.appRate.preferences.storeAppURL = {
    //   ios: '<app_id>',
    //   android: 'market://details?id=<package_name>',
    //   windows: 'ms-windows-store://review/?ProductId=<store_id>'
    // }
    // this.appRate.promptForRating(true);
    // or, override the whole preferences object
    // this.appRate.preferences = {
    //   usesUntilPrompt: 3,
    //   storeAppURL: {
    //     ios: '<app_id>',
    //     android: 'market://details?id=<package_name>',
    //     windows: 'ms-windows-store://review/?ProductId=<store_id>'
    //   }
    // }

    // this.appRate.promptForRating(false);
  }

}
