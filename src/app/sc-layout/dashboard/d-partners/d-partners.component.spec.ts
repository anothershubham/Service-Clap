import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DPartnersComponent } from './d-partners.component';

describe('DPartnersComponent', () => {
  let component: DPartnersComponent;
  let fixture: ComponentFixture<DPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
