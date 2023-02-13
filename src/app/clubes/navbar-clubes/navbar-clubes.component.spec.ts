import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarClubesComponent } from './navbar-clubes.component';

describe('NavbarClubesComponent', () => {
  let component: NavbarClubesComponent;
  let fixture: ComponentFixture<NavbarClubesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarClubesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarClubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
