import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCocktailsComponent } from './add-edit-cocktails.component';

describe('AddEditCocktailsComponent', () => {
  let component: AddEditCocktailsComponent;
  let fixture: ComponentFixture<AddEditCocktailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCocktailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCocktailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
