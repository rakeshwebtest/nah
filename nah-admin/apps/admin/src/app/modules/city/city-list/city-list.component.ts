import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppHttpClient } from '../../../utils/app-http-client.service';

@Component({
  selector: 'theapp-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  cols = [];
  cityList = [];
  modalRef: NgbModalRef;
  modalTitle: string;
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  amoutType: string;
  model: any = {};
  userCreditDebitInfo: any = {};
  sessionInfo: any = {};
  users: any = [];
  userInfo: any = {};
  selectedCity: any;
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          key: 'cityName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'City Name',
            description: '',
            placeholder: 'Enter City Name',
            required: true
          }
        }
      ]
    }
  ];
  constructor(private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appHttp: AppHttpClient) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'City Name' }
    ];
    // this.cityList = [
    //   {
    //     'name': 'New York', 'createdBy': 'Admin'
    //   },
    //   {
    //     'name': 'Los Angeles', 'createdBy': 'Admin'
    //   },
    //   {
    //     'name': 'Chicago', 'createdBy': 'Admin'
    //   }
    // ];
    this.getCities();
    
  }
  getCities() {
    const payload: any = {};
    this.appHttp.get('city/list').subscribe(res => {
      if(res.data) {
        this.cityList = res.data;
      }
    });
  }
  onAdd(addCity) {
    this.modalRef = this.modalService.open(addCity, {});
  }
  onUpdate(addCity) {
    this.modalRef = this.modalService.open(addCity, {});
  }
  addCity() {
    console.log('add city model-->', this.model);
  }
}
