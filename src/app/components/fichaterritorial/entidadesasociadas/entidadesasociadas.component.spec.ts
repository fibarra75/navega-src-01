import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesasociadasComponent } from './entidadesasociadas.component';

describe('EntidadesasociadasComponent', () => {
  let component: EntidadesasociadasComponent;
  let fixture: ComponentFixture<EntidadesasociadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntidadesasociadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntidadesasociadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
