import { TestBed } from '@angular/core/testing';

import { AuthOrientistaService } from './auth-orientista.service';

describe('AuthOrientistaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthOrientistaService = TestBed.get(AuthOrientistaService);
    expect(service).toBeTruthy();
  });
});
