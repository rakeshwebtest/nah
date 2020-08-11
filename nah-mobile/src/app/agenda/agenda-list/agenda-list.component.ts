import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from 'src/app/utils';
import { AppRouterNavigateService } from 'src/app/utils/app-router-navigate.service';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss'],
})
export class AgendaListComponent implements OnInit {
  agendaList = [];
  constructor(private http: AppHttpClient, public appNav: AppRouterNavigateService) { }

  ngOnInit() {
    this.http.get('agenda').subscribe(res => {
      if (res.data) {
        this.agendaList = res.data;
      }
    });
  }

}
