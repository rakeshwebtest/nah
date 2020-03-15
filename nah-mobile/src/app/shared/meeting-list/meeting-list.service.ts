import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingListService {
  private subject = new Subject<any>();

  constructor() { }

  meetingReload() {
    this.subject.next('reload');
  }
  getChanges(): Observable<any> {
    return this.subject.asObservable();
  }
}
