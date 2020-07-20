import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ClientBudgetItem } from '@core/models';

const defaultBudgetItem: ClientBudgetItem = {
  id: '',
  activity: 0,
  amount: 0,
  available: 0,
  categoryId: '',
  categoryName: '',
  children: [],
};

export interface NewBudgetItemInfo {
  categoryId: string;
  name: string;
}

@Component({
  selector: 'cbx-budget-item-group',
  templateUrl: './budget-item-group.component.html',
  styleUrls: ['./budget-item-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BudgetItemGroupComponent {
  @Input() budgetItem: ClientBudgetItem = defaultBudgetItem;
  @Output() newBudgetItemRequested = new EventEmitter<NewBudgetItemInfo>();
  @Output() budgetItemAmountUpdated = new EventEmitter<{ budgetItemId: string; newAmount: number }>();

  expandPanel(matExpansionPanel: MatExpansionPanel, event: Event): void {
    event.stopPropagation(); // Preventing event bubbling

    if (!this._isExpansionIndicator(event.target)) {
      matExpansionPanel.toggle(); // Here's the magic
    }
  }

  private _isExpansionIndicator(target: EventTarget | null): boolean {
    if (target) {
      const expansionIndicatorClass = 'mat-expansion-indicator';
      return (target as HTMLElement).classList && (target as HTMLElement).classList.contains(expansionIndicatorClass);
    } else {
      return false;
    }
  }
}
