import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuenosAiresComponent } from './buenos-aires.component';

describe('BuenosAiresComponent', () => {
  let component: BuenosAiresComponent;
  let fixture: ComponentFixture<BuenosAiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuenosAiresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuenosAiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
