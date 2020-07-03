import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientBudgetItem } from '../../../store/budgetItems/interfaces';
import { BudgetItemGroupComponent } from './budget-item-group.component';

const defaultBudgetItem: ClientBudgetItem = {
  id: 'budget_id',
  categoryName: 'Category',
  categoryId: 'category_id',
  amount: 100,
  activity: 100,
  available: 100,
  children: [],
};

describe('CategoryItemComponent', () => {
  let component: BudgetItemGroupComponent;
  let fixture: ComponentFixture<BudgetItemGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetItemGroupComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetItemGroupComponent);
    component = fixture.componentInstance;
    component.budgetItem = defaultBudgetItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
