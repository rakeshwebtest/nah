import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: any;
  constructor(private loadingController: LoadingController) { }
  async show() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.loading.present();
  }
  hide() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
  async presentLoading(loading) {
    return await loading.present();
  }
}
