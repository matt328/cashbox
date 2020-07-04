import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientBudgetItem } from '@core/models';
import { BudgetItemComponent } from './budget-item.component';

describe('BudgetItemComponent', () => {
  let component: BudgetItemComponent;
  let fixture: ComponentFixture<BudgetItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    const clientBudgetItem: ClientBudgetItem = {
      id: '100',
      amount: 100.0,
      activity: 40,
      available: 60,
      categoryId: 'some_category_id',
      categoryName: 'some_category',
      children: [],
    };
    fixture = TestBed.createComponent(BudgetItemComponent);
    component = fixture.componentInstance;
    component.budgetItem = clientBudgetItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
