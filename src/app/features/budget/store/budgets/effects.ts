import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ClientBudget } from '@core/models';
import { BudgetService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { map, switchMap } from 'rxjs/operators';
import * as BudgetActions from './actions';

@Injectable()
export class BudgetEffects {
  constructor(private actions$: Actions, private budgetService: BudgetService, private router: Router, private ngZone: NgZone) {}

  // public createNextBudget = this.actions$.pipe(
  //   ofType(BudgetActions.createNextBudget),
  //   switchMap(() => null)
  // );

  setCurrentBudget = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BudgetActions.setCurrentBudget),
        map(({ budgetId }) => this.ngZone.run(() => this.router.navigate(['budgets', budgetId])))
      ),
    { dispatch: false }
  );

  observeBudgetAdds = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.startObserving),
      switchMap(() =>
        this.budgetService.budgetAdds$.pipe(map((budgets: ClientBudget[]) => BudgetActions.addBudgets({ budgets })))
      )
    )
  );

  observeBudgetRemoves = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.startObserving),
      switchMap(() => this.budgetService.budgetRemoves$.pipe(map((ids: string[]) => BudgetActions.removeBudgets({ ids }))))
    )
  );

  observeBudgetUpdates = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.startObserving),
      switchMap(() =>
        this.budgetService.budgetUpdates$.pipe(map((updates: Update<ClientBudget>[]) => BudgetActions.updateBudgets({ updates })))
      )
    )
  );
}
