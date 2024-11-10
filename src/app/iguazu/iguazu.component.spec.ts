import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IguazuComponent } from './iguazu.component';

describe('IguazuComponent', () => {
  let component: IguazuComponent;
  let fixture: ComponentFixture<IguazuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IguazuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IguazuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
