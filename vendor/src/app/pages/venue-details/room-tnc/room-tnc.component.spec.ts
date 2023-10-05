import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTncComponent } from './room-tnc.component';

describe('RoomTncComponent', () => {
  let component: RoomTncComponent;
  let fixture: ComponentFixture<RoomTncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomTncComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomTncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
