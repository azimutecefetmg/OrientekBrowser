import { TestBed } from '@angular/core/testing';

import { InputFormatterService } from './input-formatter.service';

describe('InputFormatterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputFormatterService = TestBed.get(InputFormatterService);
    expect(service).toBeTruthy();
  });
});
