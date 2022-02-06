import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowDriesComponent } from './show-dries.component';

describe('ShowDriesComponent', () => {
  let component: ShowDriesComponent;
  let fixture: ComponentFixture<ShowDriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
