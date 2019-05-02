import { TestBed, inject } from '@angular/core/testing';

import { SharedServiceFilterReceiverService } from './shared-service-filter-receiver.service';

describe('SharedServiceFilterReceiverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedServiceFilterReceiverService]
    });
  });

  it('should be created', inject([SharedServiceFilterReceiverService], (service: SharedServiceFilterReceiverService) => {
    expect(service).toBeTruthy();
  }));
});
