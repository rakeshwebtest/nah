import { Injectable } from '@angular/core';
import { AppHttpClient } from '../utils';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: AppHttpClient) { }
  getPosts(payload: any) {
    return this.http.get('posts/list', { params: payload });
  }

  createUpdatePost(payload) {
    return this.http.post('posts', payload);
  }
  bookmarkLikeAndDislike(payload) {
    return this.http.post('posts/bookmarkLikeAndDislike', payload);
  }
}
