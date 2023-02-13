import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginClubeComponent } from './login-clube.component';

describe('LoginClubeComponent', () => {
  let component: LoginClubeComponent;
  let fixture: ComponentFixture<LoginClubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginClubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginClubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
