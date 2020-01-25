import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PeoplesListComponent } from '../peoples-list/peoples-list.component';

@Component({
  selector: 'app-peoples-icons',
  templateUrl: './peoples-icons.component.html',
  styleUrls: ['./peoples-icons.component.scss'],
})
export class PeoplesIconsComponent implements OnInit {

  @Input() peoples: any[] = [];
  @Input() label:string;
  constructor(public modalController: ModalController) { }

  ngOnInit() { 
    
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: PeoplesListComponent,
      componentProps:{
        peoples:this.peoples,
        label:this.label
      }
    });
    return await modal.present();
  }

}
