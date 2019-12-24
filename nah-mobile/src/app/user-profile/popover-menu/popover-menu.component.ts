import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router, private popoverController: PopoverController) { }

  ngOnInit() { }
  logout() {
    this.DismissClick();
    this.authService.logout();
  }
  about() {
    this.router.navigate(['about']);
    this.DismissClick();
  }
  async DismissClick() {
    await this.popoverController.dismiss();
  }

}
