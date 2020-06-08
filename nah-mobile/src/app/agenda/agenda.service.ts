import { Injectable } from '@angular/core';
import { AppHttpClient } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  agenda: any;
  constructor(private http: AppHttpClient) {

  }
 async getAgenda() {
  await this.http.get('agenda/check').subscribe(res => {
      const data: any = res;
      if (data.data) {
        this.agenda = data.data;
        this.agenda.activeDays = this.getDays(this.agenda.startDate, null);
        this.agenda.totalDays = this.getDays(this.agenda.startDate, this.agenda.endDate)+1;
        this.agenda.totalDaysArray = Array(this.agenda.totalDays).fill(0).map((x, i) => i + 1);
        if (this.agenda.activeDays > this.agenda.totalDays) {
          this.agenda.isLocked = true;
        }
      }
    });
    return this.agenda;
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
