import { TestBed } from '@angular/core/testing';

import { FcmProviderService } from './fcm-provider.service';

describe('FcmProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FcmProviderService = TestBed.get(FcmProviderService);
    expect(service).toBeTruthy();
  });
});
