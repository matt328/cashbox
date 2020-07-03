import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ClientBudgetItem } from '../../../store/budgetItems/interfaces';
import { BudgetItemListFacade } from './budget-item-list.facade';

@Component({
  selector: 'cbx-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BudgetItemListComponent {
  @Input() budgetItems: ClientBudgetItem[] = [];

  constructor(public budgetItemListFacade: BudgetItemListFacade) {}
}
