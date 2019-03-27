import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodorderDetailComponent } from './foodorder-detail.component';

describe('FoodorderDetailComponent', () => {
  let component: FoodorderDetailComponent;
  let fixture: ComponentFixture<FoodorderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodorderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodorderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
