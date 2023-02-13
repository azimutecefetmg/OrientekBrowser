import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOrientistaComponent } from './navbar-orientista.component';

describe('NavbarOrientistaComponent', () => {
  let component: NavbarOrientistaComponent;
  let fixture: ComponentFixture<NavbarOrientistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarOrientistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarOrientistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
