import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FcmProviderService {

  constructor(public firebaseNagative: Firebase, private platform: Platform) { }
  async getToken() {
    let token;
    if (this.platform.is('android')) {
      token = await this.firebaseNagative.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNagative.getToken();
      const perm = await this.firebaseNagative.grantPermission();
    }

    if (!this.platform.is('cordova')) {

    }
    return token; //this.saveTokenToFireStore(token);

  }
  private saveTokenToFireStore(token) {

  }
}
