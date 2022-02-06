import { TestBed } from '@angular/core/testing';

import { LiquidApiService } from './liquid-api.service';

describe('LiquidApiService', () => {
  let service: LiquidApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
