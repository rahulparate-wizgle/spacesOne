import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryDataComponent } from './enquiry-data.component';

describe('EnquiryDataComponent', () => {
  let component: EnquiryDataComponent;
  let fixture: ComponentFixture<EnquiryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
