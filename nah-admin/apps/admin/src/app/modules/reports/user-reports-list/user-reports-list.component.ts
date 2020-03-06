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
  categoryWiseReportOptions = {
    title: {
      display: true,
      text: 'Category Vs Reports',
      fontSize: 16
    },
    legend: {
      position: 'bottom'
    }
  };
  categoryWiseReportData: any;
  constructor(private modalService:NgbModal, private appHttp: AppHttpClient) { }

  ngOnInit() {
    this.getReports();
    this.getReportGraphData();

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
  getReportGraphData() {

    this.appHttp.get('meeting/report/category/info').subscribe(res => {
      if (res.data) {
        const categories: any = [];
        const reports: any = [];
        res.data.forEach(category => {
          if (category.reportCount > 0) {
            categories.push(category.name + ' (' + category.reportCount + ')');
            reports.push(category.reportCount);
          }


        });

        this.categoryWiseReportData = {
          labels: categories,
          datasets: [
            {
              data: reports,
              backgroundColor: [
                '#f00', '#0f0', '#00f', '#800000', '#6b8e23', '#6050dc', '#2d4436', '#003480', '#351d63', '#000000', '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324'
              ]
            }]
        };
      }
    });

  }
}
