import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cols = [
      { field: 'cityId', header: 'City Id' },
      { field: 'cityName', header: 'City Name' },
      { field: 'cityType', header: 'City Type' }
    ];
    this.cityList = [
      {
        'cityId': 1, 'cityName': 'Raja', 'cityType': 'admin'
      },
      {
        'cityId': 2, 'cityName': 'Mohan', 'cityType': 'admin'
      },
      {
        'cityId': 3, 'cityName': 'Rakesh', 'cityType': 'admin'
      }
    ];
  }
  onAdd(addCity) {
    this.modalRef = this.modalService.open(addCity, {});
  }
  onUpdate(addCity) {
    this.modalRef = this.modalService.open(addCity, {});
  }
}
