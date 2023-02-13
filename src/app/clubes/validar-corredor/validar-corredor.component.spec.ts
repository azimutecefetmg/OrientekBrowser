import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidarCorredorComponent} from './validar-corredor.component';

describe('ValidarCorredorComponent', () => {
  let component: ValidarCorredorComponent;
  let fixture: ComponentFixture<ValidarCorredorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidarCorredorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarCorredorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
