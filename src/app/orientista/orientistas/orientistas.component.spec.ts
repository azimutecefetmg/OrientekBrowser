import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientistasComponent } from './orientistas.component';

describe('OrientistasComponent', () => {
  let component: OrientistasComponent;
  let fixture: ComponentFixture<OrientistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrientistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
