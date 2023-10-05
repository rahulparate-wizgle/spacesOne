import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateEarningComponent } from './calculate-earning.component';

describe('CalculateEarningComponent', () => {
  let component: CalculateEarningComponent;
  let fixture: ComponentFixture<CalculateEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateEarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
