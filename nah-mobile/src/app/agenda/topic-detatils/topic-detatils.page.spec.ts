import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopicDetatilsPage } from './topic-detatils.page';

describe('TopicDetatilsPage', () => {
  let component: TopicDetatilsPage;
  let fixture: ComponentFixture<TopicDetatilsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDetatilsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopicDetatilsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
