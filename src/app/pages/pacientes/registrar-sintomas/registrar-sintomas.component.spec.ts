import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSintomasComponent } from './registrar-sintomas.component';

describe('RegistrarSintomasComponent', () => {
  let component: RegistrarSintomasComponent;
  let fixture: ComponentFixture<RegistrarSintomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarSintomasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarSintomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
