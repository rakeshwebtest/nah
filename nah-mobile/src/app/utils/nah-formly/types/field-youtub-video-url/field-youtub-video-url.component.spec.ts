import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FieldYoutubVideoUrlComponent } from './field-youtub-video-url.component';

describe('FieldYoutubVideoUrlComponent', () => {
  let component: FieldYoutubVideoUrlComponent;
  let fixture: ComponentFixture<FieldYoutubVideoUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldYoutubVideoUrlComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FieldYoutubVideoUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
