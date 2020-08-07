import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';
import { BehaviorSubject } from 'rxjs';
import { AppToasterService } from './app-toaster.service';
@Injectable({
  providedIn: 'root'
})
export class FcmProviderService {
  fcmToken: any;
  currentMessage = new BehaviorSubject(null);
  constructor(public fcm: Firebase, private platform: Platform, private toaster: AppToasterService) { }
  public setToken() {
    if (this.platform.is('android')) {
      this.fcm.getToken().then(token => {
        this.fcmToken = token;
        console.log('Androi FCM token', token);
        this.fcmNotificationsOn();
      });
    }

    if (this.platform.is('ios')) {
      this.fcm.getToken().then(token => {
        this.fcmToken = token;
        console.log('ios toka', token);
        this.fcmNotificationsOn();
      });
    }

    if (!this.platform.is('cordova')) {

    }
    return this.fcmToken; // this.saveTokenToFireStore(token);

  }
  // nagative notification subscribe
  fcmNotificationsOn() {
    this.fcm.onNotificationOpen().subscribe(data => {
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground", data);
        this.toaster.presentToast(data.body);
      }
    });
  }

  fcmSubscribeToTopic(topic) {
   // return this.fcm.subscribeToTopic(topic);
    // return this.fcm.onNotification();
  }
  fcmUnsubscribeFromTopic(topic) {
   //  return this.fcm.unsubscribeFromTopic(topic);
  }

  // for web application notification request
  requestPermission() {

  }
  receiveMessage() {
  }
}
