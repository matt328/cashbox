import { Injectable } from '@angular/core';
import { GlobalState } from '@core/models';
import { select, Store } from '@ngrx/store';
import { observeCategories, stopObservingCategories } from '@shared/categories/store/categories.actions';
import { selectPathParam } from '@shared/router.selectors';
import { Subscription } from 'rxjs';
import { filter, pairwise, startWith, take } from 'rxjs/operators';
import { startObservingItems, stopObservingItems } from '../store/budgetItems/actions';
import { ClientBudgetItem } from '../store/budgetItems/interfaces';
import { createNextBudget, setCurrentBudget, startObserving, stopObserving } from '../store/budgets/actions';
import { selectBudgetSummaries, selectCurrentBudget, selectCurrentClientBudgetItems } from '../store/selectors';

@Injectable({ providedIn: 'root' })
export class BudgetFacade {
  readonly budgetSummaries$ = this.store.pipe(
    select(selectBudgetSummaries),
    filter((arr) => arr.length > 0)
  );
  readonly currentBudgetItems$ = this.store.pipe(select(selectCurrentClientBudgetItems));
  readonly currentBudget$ = this.store.pipe(select(selectCurrentBudget));

  private currentBudgetSubscription?: Subscription;

  constructor(private store: Store<GlobalState>) {
    this.currentBudgetItems$.subscribe((v: ClientBudgetItem[]) => {});
  }

  init(): void {
    this.store.dispatch(startObserving());
    this.store.dispatch(observeCategories());
    const currentBudgetId$ = this.store.pipe(
      select(selectCurrentBudget),
      startWith(undefined),
      pairwise(),
      filter((b) => !!b[1])
    );
    this.currentBudgetSubscription = currentBudgetId$.subscribe((budgetIds) => {
      if (!!budgetIds[0]) {
        this.store.dispatch(stopObservingItems({ budgetId: budgetIds[0].id }));
      } else if (!!budgetIds[1]) {
        this.store.dispatch(startObservingItems({ budgetId: budgetIds[1].id }));
      }
    });
  }

  destroy(): void {
    this.store.dispatch(stopObserving());
    this.store.dispatch(stopObservingCategories());
    this.store
      .pipe(select(selectPathParam, { name: 'id' }), take(1))
      .subscribe((budgetId) => this.store.dispatch(stopObservingItems({ budgetId })));
    if (this.currentBudgetSubscription) {
      this.currentBudgetSubscription.unsubscribe();
    }
  }

  selectBudget(budgetId: string): void {
    this.store.dispatch(setCurrentBudget({ budgetId }));
  }

  createNextBudget(): void {
    this.store.dispatch(createNextBudget());
  }
}
