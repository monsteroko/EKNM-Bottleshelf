import { TestBed } from '@angular/core/testing';

import { DryApiService } from './dry-api.service';

describe('DryApiService', () => {
  let service: DryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
