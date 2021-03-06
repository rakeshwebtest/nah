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
  search: string;
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
          key: 'name',
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
      { field: 'name', header: 'City Name' },
      { field: 'usersCount', header: 'Total Users' }
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
  onDelete(city) {
    this.appHttp.delete('city/'+city.id).subscribe(res => {
      this.getCities();
    });
  }
  onAdd(addCity) {
    this.model = {};
    this.modalRef = this.modalService.open(addCity, {});
  }
  onUpdate(addCity, row) {
    this.model = row;
    this.modalRef = this.modalService.open(addCity, {});
  }
  saveCity() {
    console.log('add city model-->', this.model);
    if(this.form.valid) {
      this.appHttp.post('city', this.model).subscribe(res => {
        if(res.data) {
          this.modalRef.close();
          this.ngOnInit();
        }
      });
    }
  }
  updateCity() {
    console.log('add city model-->', this.model);
    if(this.form.valid) {
      this.appHttp.put('city', this.model).subscribe(res => {
        if(res.data) {
          this.modalRef.close();
          this.ngOnInit();
        }
      });
    }
  }
  searchList() {
    console.log('search -->', this.search);
    this.appHttp.get('city/list?search='+this.search).subscribe(res => {
      if(res.data) {
        this.cityList = res.data;
      }
    });
  }
}
