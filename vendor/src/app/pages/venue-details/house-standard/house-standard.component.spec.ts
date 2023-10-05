import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseStandardComponent } from './house-standard.component';

describe('HouseStandardComponent', () => {
  let component: HouseStandardComponent;
  let fixture: ComponentFixture<HouseStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseStandardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
