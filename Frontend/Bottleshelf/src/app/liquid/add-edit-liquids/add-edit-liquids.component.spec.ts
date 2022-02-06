import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLiquidsComponent } from './add-edit-liquids.component';

describe('AddEditLiquidsComponent', () => {
  let component: AddEditLiquidsComponent;
  let fixture: ComponentFixture<AddEditLiquidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLiquidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLiquidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
