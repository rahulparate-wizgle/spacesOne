import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBlockComponent } from './custom-block.component';

describe('CustomBlockComponent', () => {
  let component: CustomBlockComponent;
  let fixture: ComponentFixture<CustomBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
