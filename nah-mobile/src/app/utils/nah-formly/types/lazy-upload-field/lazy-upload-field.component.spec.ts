import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LazyUploadFieldComponent } from './lazy-upload-field.component';

describe('LazyUploadFieldComponent', () => {
  let component: LazyUploadFieldComponent;
  let fixture: ComponentFixture<LazyUploadFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyUploadFieldComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LazyUploadFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
