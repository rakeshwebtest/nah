import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppHttpClient } from '../utils';
import { UserConfigService } from '../utils/user-config.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { LoadingService } from '../utils/loading.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface City {
  id: number;
  name: string;
}
@Component({
  selector: 'theapp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  cityList: City[];
  @Input() showUpdateProfileBtn: boolean;
  @Output() updatedProfileEvent: EventEmitter<any> = new EventEmitter();
  @Input() profile = {
    typeOfNoer: null, // anties || rejection || hater
    city: null,
    followGroups: [],
    newGroupName: null
  };
  citiesSubscription: Subscription;

  constructor(private router: Router, private http: AppHttpClient,
    public loadingService: LoadingService,
    private userConfigService: UserConfigService) { }

  async ngOnInit() {
    //this.getCities();
    this.getCities();

  }
  searchCitites(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    this.cityList = [];
    this.getCities(event);
  }
  getCities(infinity?: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let skip = 0;
    let take = 100;
    if (infinity) {
      skip = this.cityList.length;
    } else {

    }
    const params: any = {
      skip: skip,
      take: take
    };
    if (infinity && infinity.text) {
      console.log(infinity.text);
      this.cityList = [];
      const searchText = infinity.text.trim().toLowerCase();
      params.search = searchText;
    }


    this.http.get('city/list', { params: params }).subscribe(res => {
      const result = <City[]>res.data;
      if (infinity && !params.search) {
        this.cityList = [...this.cityList, ...result];
        infinity.component.endInfiniteScroll();
      } else {
        this.cityList = result;
      }
    });

  }


  getMoreCities(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    this.getCities(event);
  }
  onCreateGroup() {
    this.userConfigService.updateProfile = this.profile;
    this.router.navigate(['/choose-user-group']);
  }
  updateProfile() {
    this.http.put('user', this.profile).subscribe(res => {
      this.updatedProfileEvent.emit(res.data);
    });
  }

  noerSelection(type) {
    switch (type) {
      case 'rejection':
        this.profile.typeOfNoer = 'rejection';
        break;
      case 'hater':
        this.profile.typeOfNoer = 'hater';
        break;
      default:
        this.profile.typeOfNoer = 'anties';
        break;
    }

  }


}
