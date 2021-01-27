import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { ReportComponent } from 'src/app/shared/report/report.component';
import { AppHttpClient } from 'src/app/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AppAlertService } from 'src/app/utils/app-alert.service';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-post-details-actions',
  templateUrl: './post-details-actions.component.html',
  styleUrls: ['./post-details-actions.component.scss'],
})
export class PostDetailsActionsComponent implements OnInit {

  @Input() postId: any;
  @Input() post: any;
  @Input() userInfo: any;

  constructor(private popoverController: PopoverController,
    private http: AppHttpClient,
    private activeRouter: ActivatedRoute,
    private nativeStorage: Storage,
    private route: Router,
    private alertS: AppAlertService,
    private postS: PostService,
    private alertCtrl: AlertController, public modalController: ModalController) { }

  ngOnInit() { }
  async DismissClick() {
    await this.popoverController.dismiss();
  }
  async reportModal() {
    this.DismissClick();
    const modal = await this.modalController.create({
      component: ReportComponent,
      componentProps: {
        postId: this.postId,
        post: this.post
      },
      cssClass: 'group-create-modal2'
    });
    return await modal.present();
  }
  editPost() {
    this.DismissClick();
    this.nativeStorage.set('postDetails', this.post).then(res => {
      this.route.navigate(['/posts/create/' + this.post.id]);
    });
  }


  deletePost() {
    this.DismissClick();
    this.alertS.presentConfirm(null, 'Are you sure delete this post').then(res => {
      if (res) {
        this.post.isDeleted = 1;
        this.postS.createUpdatePost(this.post).subscribe(resData => {
          this.route.navigate(['/dashboard/posts']);
          this.postS.postReload();
        }, error => {

        });
      }
    });
  }

}
