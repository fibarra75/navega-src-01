import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgypryComponent } from './prgypry.component';

describe('PrgypryComponent', () => {
  let component: PrgypryComponent;
  let fixture: ComponentFixture<PrgypryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgypryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrgypryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
