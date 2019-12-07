import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUserGroupsComponent } from './choose-user-groups.component';

describe('ChooseUserGroupsComponent', () => {
  let component: ChooseUserGroupsComponent;
  let fixture: ComponentFixture<ChooseUserGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseUserGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseUserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
