import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnServicesComponent } from './add-on-services.component';

describe('AddOnServicesComponent', () => {
  let component: AddOnServicesComponent;
  let fixture: ComponentFixture<AddOnServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOnServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOnServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
