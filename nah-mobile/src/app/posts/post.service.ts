import { Injectable } from '@angular/core';
import { AppHttpClient } from '../utils';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private subject = new Subject<any>();
  constructor(private http: AppHttpClient) { }
  getPosts(payload: any) {
    return this.http.get('posts/list', { params: payload });
  }
  getPostById(postId: any) {
    return this.http.get('posts/' + postId);
  }

  createUpdatePost(payload) {
    return this.http.post('posts', payload);
  }
  bookmarkLikeAndDislike(payload) {
    return this.http.post('posts/bookmarkLikeAndDislike', payload);
  }

  postReload(cmd = 'reload') {
    this.subject.next(cmd);
  }
  getChanges(): Observable<any> {
    return this.subject.asObservable();
  }
}
