import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AppRouterNavigateService {

  constructor(public storage: Storage, public router: Router) { }

  public goToTopicDetails(topic) {
    this.storage.set('topicDetails', topic).then(res => {
      this.router.navigate(['/agenda/topic-detatils/' + topic.id]);
    });
  }
}

// export function AppRouterCreator(storage: Storage, router: Router) {
//   return new AppRouterNavigateService(storage, router);
// }
