import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DPendingOrdersComponent } from './d-pending-orders.component';

describe('DPendingOrdersComponent', () => {
  let component: DPendingOrdersComponent;
  let fixture: ComponentFixture<DPendingOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DPendingOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DPendingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
