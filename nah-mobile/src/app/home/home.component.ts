import { Component, OnInit, ViewChild} from '@angular/core';
import { LoadingController, AlertController, Platform, IonRouterOutlet } from '@ionic/angular';
import { AppHttpClient } from './../utils';
import { Route, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { UserConfigService } from '../utils/user-config.service';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FcmProviderService } from '../utils/fcm-provider.service';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';
import * as firebase from 'firebase';
@Component({
  selector: 'theapp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  submitted = false;
  slideOpts = {

  };
  loading:any;
  isIos = false;
  @ViewChild(IonRouterOutlet, null) routerOutlet: IonRouterOutlet;
  constructor(
    private http: AppHttpClient,
    private router: Router,
    private googlePlus: GooglePlus,
    private authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    private platform: Platform,
    public alertController: AlertController,
    private userConfigService: UserConfigService,
    private fcmService: FcmProviderService,
    private signInWithApple: SignInWithApple,
    private fireAuth: AngularFireAuth

  ) {
    //     private fireAuth: AngularFireAuth
  }
  ngOnInit(){
    if (this.platform.is('ios')) {
      this.isIos = true;
    }
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

    let params;
    if (this.platform.is('android')) {
      params = {
        webClientId: '196016802810-lnb3pk45vliiddoqokmgd7jfk33mb36c.apps.googleusercontent.com',
        offline: true
      };
    } else if (this.platform.is('cordova')) {
      params = {
        webClientId: '196016802810-lnb3pk45vliiddoqokmgd7jfk33mb36c.apps.googleusercontent.com',
        offline: true
      };
    }
    this.googlePlus.login(params).then(user => {
      this.login(user);
       const { idToken, accessToken } = user;
      this.onLoginSuccess(idToken, accessToken);
      // this.loading.dismiss();
    }, err => {
      console.log('google sign error', err);
      if (!this.platform.is('cordova')) {
        this.presentAlert();
      }
      this.loading.dismiss();
    });
  }
  async login(user) {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(this.loading);
    if (this.fcmService.fcmToken) {
      user.fcmToken = this.fcmService.fcmToken;
    }
    this.http.post('user/login', user).subscribe(res => {
      if (res.success) {
        const _resUser: any = res.data;
        this.userConfigService.user = _resUser;
        console.log('_resUser', _resUser);
        // save user data on the native storage
        this.authenticationService.login(_resUser);
        
      }
      this.loading.dismiss();
    },err=>{
      this.loading.dismiss();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async signInWithAppleBtn(){

    try {
      const appleCredential: AppleSignInResponse = await this.signInWithApple.signin({
        requestedScopes: [0,0]
      });
      const credential = new firebase.auth.OAuthProvider('apple.com').credential(
        appleCredential.identityToken
      );
      const userCredential:firebase.auth.UserCredential = await this.fireAuth.signInWithCredential(credential);
      console.log('firebase UserCredential', userCredential.user.email);
      console.log('appleCredential', appleCredential);
      const data:any = appleCredential;
      if(data.fullName){
        data.displayName = data.fullName.givenName;
      }
      data.provider = 'ios';
      data.idToken = data.identityToken;
      if(!userCredential.user.email){
        alert('Email required');
      }else{
        data.email = userCredential.user.email;
      }
      this.login(data);
    } catch (error) {
      console.log(error);
    }



    // this.signInWithApple.signin({
    //   requestedScopes: [
    //     ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
    //     ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
    //   ]
    // })
    // .then((res: AppleSignInResponse) => {
    //   // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
    //   const data:any = res;
    //   if(data.fullName){
    //     data.displayName = data.fullName.givenName;
    //   }
    //   data.type = 'ios';
    //   data.idToken = data.identityToken;
    //   if(!data.email){
    //     alert('Email required');
    //   }
    //   this.login(data);
    // })
    // .catch((error: AppleSignInErrorResponse) => {
    //   // alert(error.code + ' ' + error.localizedDescription);
    //   console.error(error);
    // });
  }

  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((response) => {
        console.log('fireresponse',response);
      });

  }


  async presentLoading(loading) {
    return await loading.present();
  }

}
