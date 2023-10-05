import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueTypeComponent } from './venue-type.component';

describe('VenueTypeComponent', () => {
  let component: VenueTypeComponent;
  let fixture: ComponentFixture<VenueTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenueTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
