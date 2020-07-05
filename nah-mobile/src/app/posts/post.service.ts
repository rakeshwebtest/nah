import { Injectable } from '@angular/core';
import { AppHttpClient } from '../utils';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  limit = 100;
  offset = 0;
  postBehavior = new BehaviorSubject<any[]>([]);
  list$: Observable<any[]>;
  constructor(private http: AppHttpClient) { }
  getPosts() {
    return this.http.get('posts/list');
  }
  loadPosts() {
    this.getPosts().subscribe(res => {
      this.postBehavior.next(res.data);
    });
  }
  createUpdatePost(payload) {
    return this.http.post('posts', payload);
  }
}
