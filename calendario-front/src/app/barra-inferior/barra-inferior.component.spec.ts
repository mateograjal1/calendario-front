import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraInferiorComponent } from './barra-inferior.component';

describe('BarraInferiorComponent', () => {
  let component: BarraInferiorComponent;
  let fixture: ComponentFixture<BarraInferiorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraInferiorComponent]
    });
    fixture = TestBed.createComponent(BarraInferiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
