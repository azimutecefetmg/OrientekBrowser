import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubesListaEventosComponent } from './clubes-lista-eventos.component';

describe('ClubesListaEventosComponent', () => {
  let component: ClubesListaEventosComponent;
  let fixture: ComponentFixture<ClubesListaEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubesListaEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubesListaEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
