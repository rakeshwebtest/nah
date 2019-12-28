import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAmountComponent } from './user-amount.component';

describe('UserAmountComponent', () => {
  let component: UserAmountComponent;
  let fixture: ComponentFixture<UserAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
