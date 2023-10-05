import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeableServicesComponent } from './chargeable-services.component';

describe('ChargeableServicesComponent', () => {
  let component: ChargeableServicesComponent;
  let fixture: ComponentFixture<ChargeableServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeableServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargeableServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
