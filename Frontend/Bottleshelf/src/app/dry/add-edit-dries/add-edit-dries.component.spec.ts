import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDriesComponent } from './add-edit-dries.component';

describe('AddEditDriesComponent', () => {
  let component: AddEditDriesComponent;
  let fixture: ComponentFixture<AddEditDriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
