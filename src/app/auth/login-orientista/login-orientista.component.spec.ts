import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOrientistaComponent } from './login-orientista.component';

describe('LoginOrientistaComponent', () => {
  let component: LoginOrientistaComponent;
  let fixture: ComponentFixture<LoginOrientistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOrientistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOrientistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
