import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientBudgetItem } from '../../../store/budgetItems/interfaces';

const defaultBudgetItem: ClientBudgetItem = {
  id: '',
  activity: 0,
  amount: 0,
  available: 0,
  categoryId: '',
  categoryName: '',
  children: [],
};

@Component({
  selector: 'cbx-budget-item',
  templateUrl: './budget-item.component.html',
  styleUrls: ['./budget-item.component.scss'],
})
export class BudgetItemComponent {
  @Input() budgetItem: ClientBudgetItem = defaultBudgetItem;
  @Output() budgetedAmountUpdated = new EventEmitter<{ budgetItemId: string; newAmount: number }>();

  updateBudgetItemAmount(newAmount: number): void {
    if (!this.budgetItem) {
      log.warn('No Budget Item provided to BudgetItemComponent');
      return;
    }
    if (this.budgetItem.amount !== newAmount) {
      this.budgetedAmountUpdated.emit({ budgetItemId: this.budgetItem.id, newAmount });
    }
  }
}
