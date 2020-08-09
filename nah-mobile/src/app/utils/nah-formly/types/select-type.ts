import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AppHttpClient } from '../../app-http-client.service';
export interface City {
  id: number;
  name: string;
}
@Component({
  selector: 'formly-field-select',
  template: `
    <ionic-selectable *ngIf="to.type!=='city'" item-content closeButtonSlot="end" closeButtonText="Close"
     [placeholder]="to.placeholder" [itemValueField]="to.itemValueField"
    [shouldStoreItemValue]="to.itemValueField"
    [formControl]="formControl" [ionFormlyAttributes]="field"
    [itemTextField]="to.itemTextField" [items]="to.options" [canSearch]="true">
  </ionic-selectable>
  <ionic-selectable *ngIf="to.type ==='city'" item-content   closeButtonSlot="end" closeButtonText="Close"
  [formControl]="formControl" [placeholder]="to.placeholder" itemValueField="id"
        [hasInfiniteScroll]="true"
        (onSearch)="searchCitites($event)"
        (onInfiniteScroll)="getMoreCities($event)"
         itemTextField="name" [items]="cityList" [canSearch]="true">
        </ionic-selectable>
  `,
})
export class FieldSelectableComponent extends FieldType implements OnInit {
  cityList: City[];
  constructor(private http: AppHttpClient) {
    super();
  }
  ngOnInit() {
    if (this.to.type == 'city') {
      this.cityList = [];
      this.getCities();
    }
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
      this.cityList = [];
      const searchText = infinity.text.trim().toLowerCase();
      params.search = searchText;
    }


    this.http.get('city/list', { params: params }).subscribe(res => {
      const result = <City[]>res.data;
      if (infinity) {
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

}
