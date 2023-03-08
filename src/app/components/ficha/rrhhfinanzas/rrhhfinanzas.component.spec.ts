import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhfinanzasComponent } from './rrhhfinanzas.component';

describe('RrhhfinanzasComponent', () => {
  let component: RrhhfinanzasComponent;
  let fixture: ComponentFixture<RrhhfinanzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrhhfinanzasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrhhfinanzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
