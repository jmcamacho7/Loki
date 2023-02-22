import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfildesconocidoComponent } from './perfildesconocido.component';

describe('PerfildesconocidoComponent', () => {
  let component: PerfildesconocidoComponent;
  let fixture: ComponentFixture<PerfildesconocidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfildesconocidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfildesconocidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
