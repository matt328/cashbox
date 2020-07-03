import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InlineEditComponent } from './inline-edit.component';

describe('InlineEditComponent', () => {
  let component: InlineEditComponent;
  let fixture: ComponentFixture<InlineEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InlineEditComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(InlineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
