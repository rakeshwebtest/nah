import { Component, OnInit, Input } from "@angular/core";
import { AppHttpClient } from "src/app/utils";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { AgendaService } from "../agenda.service";
import { AppRouterNavigateService } from "src/app/utils/app-router-navigate.service";

@Component({
  selector: "app-agenda-view",
  templateUrl: "./agenda-view.component.html",
  styleUrls: ["./agenda-view.component.scss"],
})
export class AgendaViewComponent implements OnInit {
  agenda: any;
  showCreateBtn: boolean;
  activeDays = 1;
  @Input() showCreateMsg = false;
  @Input() showShowOldAgenda = true;
  @Input() agendaTitle = "Agenda";
  showAgendaBtn = false;
  totalDaysArray = [];
  totalDays = 0;
  constructor(
    private http: AppHttpClient,
    private storage: Storage,
    public appRouter: AppRouterNavigateService,
    private router: Router,
    public agendaS: AgendaService
  ) {}

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
  }
  ngOnInit() {
    // this.checkAgenda();
    this.agendaS.checkAgenda();
    if (this.showShowOldAgenda) {
      this.getAgentList();
    }
  }

  createAgenda() {
    this.router.navigate(["/agenda/create"]);
  }
  topicDetails(topic) {
    this.appRouter.goToTopicDetails(topic);
  }

  getAgentList() {
    this.http.get("agenda").subscribe((res) => {
      if (res.data) {
        if (res.data.length > 0) {
            this.showAgendaBtn = true;
        }
      }
    });
  }
}
