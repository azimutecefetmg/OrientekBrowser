import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EnviarComprovanteComponent} from './enviar-comprovante.component';

describe('EnviarComprovanteComponent', () => {
  let component: EnviarComprovanteComponent;
  let fixture: ComponentFixture<EnviarComprovanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnviarComprovanteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarComprovanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
