import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthSelectorComponent } from './month-selector.component';

describe('MonthSelectorComponent', () => {
  let component: MonthSelectorComponent;
  let fixture: ComponentFixture<MonthSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthSelectorComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(MonthSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
