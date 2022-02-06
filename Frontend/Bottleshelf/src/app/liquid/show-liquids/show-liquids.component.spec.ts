import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLiquidsComponent } from './show-liquids.component';

describe('ShowLiquidsComponent', () => {
  let component: ShowLiquidsComponent;
  let fixture: ComponentFixture<ShowLiquidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowLiquidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLiquidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
