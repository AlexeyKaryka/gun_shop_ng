import { TestBed, inject } from '@angular/core/testing';

import { SharedServiceFilterService } from './shared-service-filter.service';

describe('SharedServiceFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedServiceFilterService]
    });
  });

  it('should be created', inject([SharedServiceFilterService], (service: SharedServiceFilterService) => {
    expect(service).toBeTruthy();
  }));
});
