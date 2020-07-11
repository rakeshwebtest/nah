import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YoutubeVideosListComponent } from './youtube-videos-list.component';

describe('YoutubeVideosListComponent', () => {
  let component: YoutubeVideosListComponent;
  let fixture: ComponentFixture<YoutubeVideosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeVideosListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YoutubeVideosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
