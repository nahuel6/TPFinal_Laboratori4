import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarilocheComponent } from './bariloche.component';

describe('BarilocheComponent', () => {
  let component: BarilocheComponent;
  let fixture: ComponentFixture<BarilocheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarilocheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarilocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
