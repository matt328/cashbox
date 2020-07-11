import { Injectable } from '@angular/core';
import { ClientBudget } from '@core/models';
import { BudgetService } from '@core/services';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class BudgetToolbarFacade {
  budgetSummaries$: Observable<ClientBudget[]> = this.budgetService.getAllBudgets();
  currentBudget$: Observable<ClientBudget | undefined> = EMPTY;

  constructor(private budgetService: BudgetService) {}
}
