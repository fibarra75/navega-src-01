import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleiniciativacampanaComponent } from './detalleiniciativacampana.component';

describe('DetalleiniciativacampanaComponent', () => {
  let component: DetalleiniciativacampanaComponent;
  let fixture: ComponentFixture<DetalleiniciativacampanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleiniciativacampanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleiniciativacampanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
