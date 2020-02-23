import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedUserListComponent } from './blocked-user-list.component';

describe('BlockedUserListComponent', () => {
  let component: BlockedUserListComponent;
  let fixture: ComponentFixture<BlockedUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
