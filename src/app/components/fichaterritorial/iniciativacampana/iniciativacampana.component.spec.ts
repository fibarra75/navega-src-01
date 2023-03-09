import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativacampanaComponent } from './iniciativacampana.component';

describe('IniciativacampanaComponent', () => {
  let component: IniciativacampanaComponent;
  let fixture: ComponentFixture<IniciativacampanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciativacampanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciativacampanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
