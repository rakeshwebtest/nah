import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
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
  about() {
    this.router.navigate(['about']);
    this.DismissClick();
  }
  async DismissClick() {
    await this.popoverController.dismiss();
  }
  feedback() {
    // this.launchReview.launch()
    //   .then(() => console.log('Successfully launched store app'));

    // if (this.launchReview.isRatingSupported()) {
    //   this.launchReview.rating()
    //     .then(() => console.log('Successfully launched rating dialog'));
    // }
  }

}
