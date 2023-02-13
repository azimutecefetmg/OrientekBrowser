import { TestBed, async, inject } from '@angular/core/testing';

import { OrientistaGuard } from './orientista.guard';

describe('OrientistaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrientistaGuard]
    });
  });

  it('should ...', inject([OrientistaGuard], (guard: OrientistaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
