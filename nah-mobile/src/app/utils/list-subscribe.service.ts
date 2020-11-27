import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ListSubscribeService {
  private groupListSubject = new Subject<any>();
  constructor() {}
  groupListReload() {
    this.groupListSubject.next('reload');
  }
  groupListSubscribe(): Observable<any> {
    return this.groupListSubject.asObservable();
  }
}
