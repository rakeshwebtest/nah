import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UtilsComponent } from './utils.component';

describe('UtilsComponent', () => {
  let component: UtilsComponent;
  let fixture: ComponentFixture<UtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
