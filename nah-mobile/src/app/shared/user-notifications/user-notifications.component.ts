import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { scan } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AppAlertService } from 'src/app/utils/app-alert.service';
import { UserNotificationsService } from './user-notifications.service';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss'],
})
export class UserNotificationsComponent implements OnInit, OnDestroy {
  @Input() type: any; // following follower blocked
  @Input() userId: any;

  showAgendaView = false;
  limit = 5;
  offset = 0;
  loading = false;

  postBehavior = new BehaviorSubject<{ opt: any, list: [] }>({ opt: 'list', list: [] });
  list$: Observable<any[]>;
  constructor(private router: Router, private activeRouter: ActivatedRoute,
    public notification: UserNotificationsService, private alertCtrl: AlertController, private alertS: AppAlertService) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }
  // ionViewWillEnter(){
  //   console.log('ionViewDidEnter');
  // }
  ionViewWillEnter() {
    // if (this.activeRouter.snapshot.params.type) {
    //   this.type = this.activeRouter.snapshot.params.type;
    // }
    // if (this.activeRouter.snapshot.parent.params.id) {
    //   this.userId = this.activeRouter.snapshot.parent.params.id;
    // }

    this.offset = 0;
    this.loadData();

  }
  ngOnInit() {
    console.log('activeRouter', this.activeRouter.snapshot.params);

    this.list$ = this.postBehavior.asObservable().pipe(
      scan((acc, curr) => {
        if (curr.opt && curr.opt.type === 'delete') {
          let index = acc.findIndex((elt) => elt.id === curr.opt.id);
          acc.splice(index, 1);
          return [...acc];
        } else {
          if (this.offset === 0) {
            return [...curr.list];
          } else {
            return [...acc, ...curr.list];
          }
        }
      }, [])
    );
    this.loadData();
  }
  loadData(infiniteScroll?: any, reload?: any) {
    if (infiniteScroll) {
      this.offset = this.offset + this.limit;
    }
    const payload: any = {};
    // payload.type = this.type;
    // payload.userId = this.userId;
    payload.skip = this.offset;
    payload.take = this.limit;
    this.loading = true;
    this.notification.getNotification(payload).subscribe(res => {
      this.loading = false;
      this.postBehavior.next({ opt: 'list', list: res.data });
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
      if (reload && reload.target) {
        reload.target.complete();
        reload.target.disabled = false;
      }
    });
  }
  navProfile(user) {
    this.router.navigate(['/user-profile/' + user.id]);
  }

  reload() {
    this.offset = 0;
    this.loadData();
  }
  doRefresh(reload) {
    this.offset = 0;
    this.loadData(null, reload);
  }
  ngOnDestroy(): void {
    // this.list$.unsubscribe();
  }
}
