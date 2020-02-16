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
  constructor(private modalService:NgbModal, private appHttp: AppHttpClient) { }

  ngOnInit() {
    this.getReports();
  }
  getReports() {
    const payload: any = {};
    this.appHttp.get('group/list').subscribe(res => {
      if(res.data) {
        this.reportsList = res.data;
      }
    });
  }
}
