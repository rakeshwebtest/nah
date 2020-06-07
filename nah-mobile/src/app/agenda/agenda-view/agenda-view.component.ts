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
  showCreateBtn: boolean;
  activeDays = 1;
  totalDaysArray = [];
  totalDays = 0;
  constructor(private http: AppHttpClient, private router: Router) { }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }
  ngOnInit() {
    this.checkAgenda();
  }
  checkAgenda() {
    this.http.get('agenda/check').subscribe(res => {
      const data: any = res;
      if (data.data) {
        this.agenda = data.data;
        this.activeDays = this.getDays(this.agenda.startDate, null);
        this.totalDays = this.getDays(this.agenda.startDate, this.agenda.endDate);
        this.totalDaysArray = Array(this.totalDays).fill(0).map((x, i) => i + 1);
        if(this.activeDays>this.totalDays){
          this.agenda.isLocked = true;
        }
        
      } else {
        this.showCreateBtn = true;
      }
    })
  }
  createAgenda() {
    this.router.navigate(['/agenda'])
  }
  getDays(d1?: string, d2?: string) {
    let date1 = new Date();
    if (d1)
      date1 = new Date(d1);

    let date2 = new Date();
    if (d2)
      date2 = new Date(d2);

    const diff = Math.abs(date1.getTime() - date2.getTime());
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days;
  }

}
