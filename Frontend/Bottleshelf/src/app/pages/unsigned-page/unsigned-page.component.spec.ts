import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsignedPageComponent } from './unsigned-page.component';

describe('UnsignedPageComponent', () => {
  let component: UnsignedPageComponent;
  let fixture: ComponentFixture<UnsignedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsignedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsignedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
