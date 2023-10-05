import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYourVenueComponent } from './list-your-venue.component';

describe('ListYourVenueComponent', () => {
  let component: ListYourVenueComponent;
  let fixture: ComponentFixture<ListYourVenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListYourVenueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListYourVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
