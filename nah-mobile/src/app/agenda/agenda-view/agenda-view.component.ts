import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from 'src/app/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda-view',
  templateUrl: './agenda-view.component.html',
  styleUrls: ['./agenda-view.component.scss'],
})
export class AgendaViewComponent implements OnInit {
  agenda: any;
  constructor(private http: AppHttpClient, private router: Router) { }

  ngOnInit() {
    this.checkAgenda();
  }
  checkAgenda() {
    this.http.get('agenda/check').subscribe(res => {
      const data: any = res;
      if (data.data) {
        this.agenda = data.data;
        console.log(data.data);
      }
    })
  }
  createAgenda() {
    this.router.navigate(['/agenda'])
  }

}
