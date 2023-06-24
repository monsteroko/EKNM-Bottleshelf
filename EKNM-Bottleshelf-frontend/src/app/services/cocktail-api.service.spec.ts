import { TestBed } from '@angular/core/testing';

import { CocktailApiService } from './cocktail-api.service';

describe('CocktailApiService', () => {
  let service: CocktailApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocktailApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
