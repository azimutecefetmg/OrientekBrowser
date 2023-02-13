import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpClubeComponent } from './sign-up-clube.component';

describe('SignUpClubeComponent', () => {
  let component: SignUpClubeComponent;
  let fixture: ComponentFixture<SignUpClubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpClubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpClubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
