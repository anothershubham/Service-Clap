import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ADetailsComponent } from './a-details.component';

describe('ADetailsComponent', () => {
  let component: ADetailsComponent;
  let fixture: ComponentFixture<ADetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ADetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ADetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
