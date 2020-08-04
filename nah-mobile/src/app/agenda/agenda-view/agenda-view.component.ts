import { Component, OnInit, Input } from '@angular/core';
import { AppHttpClient } from 'src/app/utils';
import { Router } from '@angular/router';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-agenda-view',
  templateUrl: './agenda-view.component.html',
  styleUrls: ['./agenda-view.component.scss'],
})
export class AgendaViewComponent implements OnInit {
  agenda: any;
  showCreateBtn: boolean;
  activeDays = 1;
  @Input() showCreateMsg = false;
  @Input() showShowOldAgenda = true;
  @Input() agendaTitle = 'Agenda';
  totalDaysArray = [];
  totalDays = 0;
  constructor(private http: AppHttpClient, private router: Router, public agendaS: AgendaService) { }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }
  ngOnInit() {
    // this.checkAgenda();
    this.agendaS.checkAgenda();
  }

  createAgenda() {
    this.router.navigate(['/agenda/create']);
  }


}
