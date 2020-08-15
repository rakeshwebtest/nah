import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppAlertService {

  constructor(private alertController: AlertController) { }
  async presentConfirm(header: any, message: any, cancelText?: string, okText?: string): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [
          {
            text: cancelText || 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve(false);
            }
          }, {
            text: okText || 'Yes',
            handler: (ok) => {
              resolve(true);
            }
          }
        ]
      });
      alert.present();
    });
  }
}
