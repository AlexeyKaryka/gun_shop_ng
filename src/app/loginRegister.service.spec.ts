import { TestBed, inject } from '@angular/core/testing';

import { LoginRegisterService } from './loginRegister.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRegisterService]
    });
  });

  it('should be created', inject([LoginRegisterService], (service: LoginRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
