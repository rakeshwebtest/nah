import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppHttpClient } from 'src/app/utils';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @Input() meetingId: any;
  constructor(private modalCtrl: ModalController, private http: AppHttpClient, private auth: AuthenticationService) { }
  title = "Report a Concern";
  comment: any;
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'categoryId',
      type: 'selectable',
      wrappers: ['vertical'],
      className: 'col-12',
      templateOptions: {
        label: 'WHY DOES THIS REVIEW CONCERN YOU?',
        placeholder: 'Select Type',
        required: true,
        itemValueField: 'id',
        itemTextField: 'name',
        options: []
      },
      hooks: {
        onInit: field => {
          this.getCategory().subscribe(res => {
            field.templateOptions.options = res;
          })
        }
      }
    },
    {
      key: 'comment',
      type: 'textarea',
      wrappers: ['vertical'],
      className: 'col-12',
      templateOptions: {
        required: true,
        maxLength: 1000,
        label: 'SOMETHING ELSE',
        placeholder: 'Enter Comment',
      }
    }];
  ngOnInit() {
    // this.getCategory().subscribe(res=>{
    //   console.log(res);
    // });
  }
  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss(data);
  }
  submitReport() {
    const user: any = this.auth.getUserInfo();
    this.model.userId = user.id;
    this.model.meetingId = this.meetingId;
    this.http.post('meeting/report', this.model).subscribe(res => {
      this.dismiss(res.data);
    })
  }
  getCategory(): Observable<any[]> {
    return this.http.get('meeting/report/category').pipe(map(res => {
      return res.data
    }));
  }

}
