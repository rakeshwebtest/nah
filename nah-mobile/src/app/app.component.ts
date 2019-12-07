import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'theapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
  ];
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    console.log('ionic serve check');
    this.platform.ready().then(() => {
      console.log('already');
      //Here we will check if the user is already logged in
      //because we don't want to ask users to log in each time they open the app
      this.nativeStorage.getItem('google_user')
        .then(data => {
          //user is previously logged and we have his data
          //we will let him access the app
          console.log('data', data);
          this.router.navigate(["/home"]);
        }, err => {
          console.log('data', err);
          this.router.navigate(["/home"]);
        })
      this.statusBar.styleDefault();
    });
  }
}
