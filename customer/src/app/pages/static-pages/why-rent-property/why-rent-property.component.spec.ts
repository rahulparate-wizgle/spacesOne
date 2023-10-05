import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyRentPropertyComponent } from './why-rent-property.component';

describe('WhyRentPropertyComponent', () => {
  let component: WhyRentPropertyComponent;
  let fixture: ComponentFixture<WhyRentPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyRentPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyRentPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
