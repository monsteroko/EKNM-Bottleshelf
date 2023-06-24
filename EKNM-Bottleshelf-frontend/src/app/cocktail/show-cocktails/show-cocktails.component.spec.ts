import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCocktailsComponent } from './show-cocktails.component';

describe('ShowCocktailsComponent', () => {
  let component: ShowCocktailsComponent;
  let fixture: ComponentFixture<ShowCocktailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCocktailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCocktailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
