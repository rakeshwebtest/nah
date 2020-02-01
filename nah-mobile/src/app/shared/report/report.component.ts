import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppHttpClient } from 'src/app/utils';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @Input() meetingId:any;
  constructor(private modalCtrl: ModalController, private http: AppHttpClient, private auth: AuthenticationService) { }
  comment: any;
  ngOnInit() { }
  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss(data);
  }
  submitReport() {
    const user: any = this.auth.getUserInfo();
    this.http.post('meeting/report', { comment: this.comment, userId: user.id,meetingId:this.meetingId }).subscribe(res => {
      this.dismiss(res.data);
    })
  }

}
