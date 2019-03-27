import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCentreComponent } from './data-centre.component';

describe('DataCentreComponent', () => {
  let component: DataCentreComponent;
  let fixture: ComponentFixture<DataCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
