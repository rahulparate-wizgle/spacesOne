import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShouldKnowComponent } from './should-know.component';

describe('ShouldKnowComponent', () => {
  let component: ShouldKnowComponent;
  let fixture: ComponentFixture<ShouldKnowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShouldKnowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShouldKnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
