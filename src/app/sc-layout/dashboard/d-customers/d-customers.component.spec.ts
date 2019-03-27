import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DCustomersComponent } from './d-customers.component';

describe('DCustomersComponent', () => {
  let component: DCustomersComponent;
  let fixture: ComponentFixture<DCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
