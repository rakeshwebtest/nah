import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { scan } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AppAlertService } from 'src/app/utils/app-alert.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @Input() type: any; // following follower blocked
  @Input() userId: any;
  @Input() groupId: any; // if type group-followers
  @Input() meetingId: any; // if type meting-members
  @Input() emptyMsg = 'No users';
  loading = false;
  showAgendaView = false;
  limit = 20;
  offset = 0;

  postBehavior = new BehaviorSubject<{ opt: any, list: [] }>({ opt: 'list', list: [] });
  list$: Observable<any[]>;
  constructor(private router: Router, private activeRouter: ActivatedRoute,
    public userS: UserService, private alertCtrl: AlertController, private alertS: AppAlertService) {

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
    if (this.meetingId) {
      payload.meetingId = this.meetingId;
    }
    if (this.groupId) {
      payload.groupId = this.groupId;
    }
    payload.type = this.type;
    payload.userId = this.userId;
    payload.skip = this.offset;
    payload.take = this.limit;
    this.loading = true;
    this.userS.getUsers(payload).subscribe(res => {
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

