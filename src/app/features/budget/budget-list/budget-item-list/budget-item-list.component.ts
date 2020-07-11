import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ClientBudgetItem } from '@core/models';
import { BudgetItemListFacade } from './budget-item-list.facade';

@Component({
  selector: 'cbx-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss'],
  providers: [BudgetItemListFacade],
  encapsulation: ViewEncapsulation.None,
})
export class BudgetItemListComponent {
  @Input() budgetItems: ClientBudgetItem[] = [];

  constructor(public budgetItemListFacade: BudgetItemListFacade) {}
}
