import { TestBed } from '@angular/core/testing';

import { MeetingListService } from './meeting-list.service';

describe('MeetingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeetingListService = TestBed.get(MeetingListService);
    expect(service).toBeTruthy();
  });
});
