import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideClubesComponent } from './aside-clubes.component';

describe('AsideClubesComponent', () => {
  let component: AsideClubesComponent;
  let fixture: ComponentFixture<AsideClubesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideClubesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideClubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
