import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemTagComponent } from './food-item-tag.component';

describe('FoodItemTagComponent', () => {
  let component: FoodItemTagComponent;
  let fixture: ComponentFixture<FoodItemTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodItemTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
