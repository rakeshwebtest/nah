import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppHttpClient } from '../../../utils/app-http-client.service';

@Component({
  selector: 'theapp-user-reports-list',
  templateUrl: './user-reports-list.component.html',
  styleUrls: ['./user-reports-list.component.scss']
})
export class UserReportsListComponent implements OnInit {
  reportsList = [];
  cols = [];
  modalRef: NgbModalRef;
  search: string;
  constructor(private modalService:NgbModal, private appHttp: AppHttpClient) { }

  ngOnInit() {
    this.getReports();
  }
  getReports() {
    const payload: any = {};
    this.appHttp.get('meeting/report').subscribe(res => {
      if(res.data) {
        this.reportsList = res.data;
      }
    });
  }
  searchList() {
    this.appHttp.get('meeting/report?search='+this.search).subscribe(res => {
      if(res.data) {
        this.reportsList = res.data;
      }
    });
  }
}
