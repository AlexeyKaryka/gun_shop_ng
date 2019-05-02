import { TestBed, inject } from '@angular/core/testing';

import { SharedServiceFilterReceiverReverseService } from './shared-service-filter-receiver-reverse.service';

describe('SharedServiceFilterReceiverReverseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedServiceFilterReceiverReverseService]
    });
  });

  it('should be created', inject([SharedServiceFilterReceiverReverseService], (service: SharedServiceFilterReceiverReverseService) => {
    expect(service).toBeTruthy();
  }));
});
