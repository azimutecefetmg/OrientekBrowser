import { TestBed, async, inject } from '@angular/core/testing';

import { AuthClubesGuard } from './auth-clubes.guard';

describe('AuthClubesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthClubesGuard]
    });
  });

  it('should ...', inject([AuthClubesGuard], (guard: AuthClubesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
