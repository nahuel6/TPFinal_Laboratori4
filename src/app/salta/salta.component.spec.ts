import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaltaComponent } from './salta.component';

describe('SaltaComponent', () => {
  let component: SaltaComponent;
  let fixture: ComponentFixture<SaltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaltaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
