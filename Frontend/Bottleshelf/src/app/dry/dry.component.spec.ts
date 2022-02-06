import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DryComponent } from './dry.component';

describe('DryComponent', () => {
  let component: DryComponent;
  let fixture: ComponentFixture<DryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
