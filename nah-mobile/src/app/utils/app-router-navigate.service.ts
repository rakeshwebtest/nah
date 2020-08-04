import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppRouterNavigateService {

  constructor(private storage: Storage, private router: Router) { }

  goToTopicDetails(topic) {
    this.storage.set('topicDetails', topic).then(res => {
      this.router.navigate(['/agenda/topic-detatils/' + topic.id]);
    });
  }
}

export function AppRouterCreator(storage: Storage, router: Router) {
  return new AppRouterNavigateService(storage, router);
}