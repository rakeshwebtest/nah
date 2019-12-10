import { Component, OnInit, ViewChild } from "@angular/core";
import { LoadingController, AlertController, Platform, IonRouterOutlet } from '@ionic/angular';
import { AppHttpClient } from './../utils';
import { Route, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'theapp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  submitted = false;
  slideOpts = {

  };
  @ViewChild(IonRouterOutlet, null) routerOutlet: IonRouterOutlet;
  constructor(
    private http: AppHttpClient,
    private router: Router,
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private platform: Platform,
    public alertController: AlertController
  ) {
  }

  signInWithGoogleTest(): void {
    const user = { email: 'rakesh.webtest@gmail.com' };
    this.login(user);
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
    //   delete user.id;
    //   this.http.post('user/login', user).subscribe(res => {
    //     console.log('ressss', res);
    //     this.router.navigate(['/sign-in']);
    //   });
    //   // this.navCtrl.setRoot(TabsPage);
    // });
  }


  signOut(): void {
    // this.authService.signOut();
  }

  async signInWithGoogle() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    this.googlePlus.login({
      offline: true
    }).then(user => {
      this.login(user);
      loading.dismiss();
    }, err => {
      console.log(err);
      if (!this.platform.is('cordova')) {
        this.presentAlert();
      }
      loading.dismiss();
    });
  }
  async login(user) {
    this.http.post('user/login', user).subscribe(res => {
      const _resUser: any = res.data.user;
      console.log('_resUser', _resUser);
      // save user data on the native storage
      this.nativeStorage.setItem('google_user', {
        displayName: _resUser.displayName,
        email: _resUser.email,
        imageUrl: _resUser.imageUrl,
        type_of_noer: _resUser.type_of_noer,
        token: res.token
      }).then(() => {
        if (_resUser) {
          if (_resUser.type_of_noer) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/sign-in']);
          }
        }
      }, (error) => {
        console.log(error);
      });
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentLoading(loading) {
    return await loading.present();
  }

}
