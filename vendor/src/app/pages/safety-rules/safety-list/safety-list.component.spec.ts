import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyListComponent } from './safety-list.component';

describe('SafetyListComponent', () => {
  let component: SafetyListComponent;
  let fixture: ComponentFixture<SafetyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
