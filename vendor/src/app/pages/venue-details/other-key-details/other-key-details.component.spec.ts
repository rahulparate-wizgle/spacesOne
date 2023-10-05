import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherKeyDetailsComponent } from './other-key-details.component';

describe('OtherKeyDetailsComponent', () => {
  let component: OtherKeyDetailsComponent;
  let fixture: ComponentFixture<OtherKeyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherKeyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherKeyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
