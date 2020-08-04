import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  agendaTitle = 'Your Agenda';
  constructor() { }

  ngOnInit() {
  }

}
