import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientBudgetItem } from '@core/models';
import { SatPopover } from '@ncstate/sat-popover';
import { Observable } from 'rxjs';
import { mergeMap, pluck, take, tap } from 'rxjs/operators';
import { NewBudgetItemInfo } from '../budget-item-group/budget-item-group.component';
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

  constructor(public budgetItemListFacade: BudgetItemListFacade, private route: ActivatedRoute) {}

  createEmptyItemGroup(categoryName: string, popover: SatPopover): void {
    const currentBudgetId$: Observable<string> = this.route.params.pipe(pluck('id'));
    currentBudgetId$
      .pipe(
        tap((x) => log.debug(x)),
        mergeMap((budgetId: string) => this.budgetItemListFacade.createTopLevelCategory(categoryName, budgetId)),
        take(1)
      )
      .subscribe(() => popover.close());
  }

  createEmptyItemInGroup({ categoryId, name }: NewBudgetItemInfo): void {
    const currentBudgetId$: Observable<string> = this.route.params.pipe(pluck('id'));
    currentBudgetId$
      .pipe(mergeMap((budgetId: string) => this.budgetItemListFacade.createChildCategory(categoryId, name, budgetId)))
      .subscribe();
  }

  updateBudgetItemAmount(item: { budgetItemId: string; newAmount: number }): void {
    this.budgetItemListFacade.updateBudgetItemAmount(item).subscribe();
  }
}
