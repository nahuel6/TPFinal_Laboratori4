import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MendozaComponent } from './mendoza.component';

describe('MendozaComponent', () => {
  let component: MendozaComponent;
  let fixture: ComponentFixture<MendozaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MendozaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MendozaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
