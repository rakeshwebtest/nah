import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppHttpClient } from '../../utils/app-http-client.service';
import { API_CONFIG } from '../../utils/api-config';
import { LocalStorageService } from '../../utils/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  selectedValues: any = [];
  submitted = false;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private appHttp: AppHttpClient,
    private ls: LocalStorageService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });

  }
  get f(): any { return this.loginForm.controls; }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // const payload = {
    //   "command": "authenticateUser",
    //   "requestData": this.loginForm.value
    // };
   // this.appHttp.get('jsonBlob/69e416bb-cbb7-11e9-a895-abb8290d8490').subscribe(res => {
  //  this.appHttp.post(API_CONFIG.LOGIN, payload).subscribe(res => {
  //     console.log('res', res);
  //     if (res) {
  //       this.ls.setItem('user', res.data, true);
  //     }
      
  //   });
    this.router.navigate(['/admin/users/list']);

  }
}
