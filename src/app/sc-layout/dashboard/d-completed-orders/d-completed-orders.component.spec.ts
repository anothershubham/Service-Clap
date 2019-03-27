import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DCompletedOrdersComponent } from './d-completed-orders.component';

describe('DCompletedOrdersComponent', () => {
  let component: DCompletedOrdersComponent;
  let fixture: ComponentFixture<DCompletedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DCompletedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DCompletedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
