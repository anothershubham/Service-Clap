import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScLayoutComponent } from './sc-layout.component';

describe('ScLayoutComponent', () => {
  let component: ScLayoutComponent;
  let fixture: ComponentFixture<ScLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
