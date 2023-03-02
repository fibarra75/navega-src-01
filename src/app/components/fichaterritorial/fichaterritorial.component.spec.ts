import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaterritorialComponent } from './fichaterritorial.component';

describe('FichaterritorialComponent', () => {
  let component: FichaterritorialComponent;
  let fixture: ComponentFixture<FichaterritorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaterritorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaterritorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
