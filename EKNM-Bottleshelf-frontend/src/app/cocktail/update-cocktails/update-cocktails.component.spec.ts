import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCocktailsComponent } from './update-cocktails.component';

describe('UpdateCocktailsComponent', () => {
  let component: UpdateCocktailsComponent;
  let fixture: ComponentFixture<UpdateCocktailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCocktailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCocktailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
