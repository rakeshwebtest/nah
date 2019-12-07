import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'theapp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onCreateGroup() {
    this.router.navigate(['/choose-user-group']);
  }
  updateSignIn() {
    this.router.navigate(['/dashboard']);
  }
}
