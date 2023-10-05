import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyFormComponent } from './safety-form.component';

describe('SafetyFormComponent', () => {
  let component: SafetyFormComponent;
  let fixture: ComponentFixture<SafetyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
