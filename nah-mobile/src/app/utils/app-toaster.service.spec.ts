import { TestBed } from '@angular/core/testing';

import { AppToasterService } from './app-toaster.service';

describe('AppToasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppToasterService = TestBed.get(AppToasterService);
    expect(service).toBeTruthy();
  });
});
