import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetingAddVideoPopupComponent } from './meeting-add-video-popup.component';

describe('MeetingAddVideoPopupComponent', () => {
  let component: MeetingAddVideoPopupComponent;
  let fixture: ComponentFixture<MeetingAddVideoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingAddVideoPopupComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetingAddVideoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
