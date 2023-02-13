import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOrientistaComponent } from './sign-orientista.component';

describe('SignOrientistaComponent', () => {
  let component: SignOrientistaComponent;
  let fixture: ComponentFixture<SignOrientistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOrientistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOrientistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
