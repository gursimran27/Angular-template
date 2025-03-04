import { TestBed } from '@angular/core/testing';

import { AuthGuard2 } from './auth-guard2.service';

describe('AuthGuard2Service', () => {
  let service: AuthGuard2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuard2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
