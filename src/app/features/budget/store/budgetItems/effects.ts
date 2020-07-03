import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalState } from '@core/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Category } from '@shared/categories';
import { of } from 'rxjs';
import { catchError, map, pluck, switchMap, withLatestFrom } from 'rxjs/operators';
import { BudgetItemsService } from '../../budget-items.service';
import * as BudgetActions from './actions';
import { BudgetItem } from './interfaces';
import { selectCurrentBudgetId } from './selectors';

@Injectable()
export class BudgetItemEffects {
  constructor(
    private actions$: Actions,
    private store: Store<GlobalState>,
    private budgetItemsService: BudgetItemsService,
    private snackBar: MatSnackBar
  ) {}

  observeBudgetAdds = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.startObservingItems),
      switchMap((value: { budgetId: string }) => {
        this.budgetItemsService.observeBudget(value.budgetId, 'added');
        return this.budgetItemsService.budgetItemAdds$.pipe(
          map((budgetItems: BudgetItem[]) => BudgetActions.addBudgetItems({ budgetItems }))
        );
      })
    )
  );

  observeBudgetRemoves = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.startObservingItems),
      switchMap((value: { budgetId: string }) => {
        this.budgetItemsService.observeBudget(value.budgetId, 'removed');
        return this.budgetItemsService.budgetItemRemoves$.pipe(map((ids: string[]) => BudgetActions.removeBudgetItems({ ids })));
      })
    )
  );

  observeBudgetUpdates = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.startObservingItems),
      switchMap((value: { budgetId: string }) => {
        this.budgetItemsService.observeBudget(value.budgetId, 'modified');
        return this.budgetItemsService.budgetItemUpdates$.pipe(
          map((updates: Update<BudgetItem>[]) => BudgetActions.updateBudgetItems({ updates }))
        );
      })
    )
  );

  stopObservingItems = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BudgetActions.stopObservingItems),
        map(({ budgetId }: { budgetId: string }) => {
          this.budgetItemsService.stopObservingBudget(budgetId);
        })
      ),
    { dispatch: false }
  );

  createItemGroup = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.createBudgetItemGroup),
      withLatestFrom(this.store.pipe(select(selectCurrentBudgetId))),
      switchMap(([category, categoryId]: [Partial<Category>, string]) =>
        this.budgetItemsService.createEmptyItemGroup(category, categoryId).pipe(
          map(() => BudgetActions.createBudgetItemGroupSuccess()),
          catchError((message) => of(BudgetActions.createBudgetItemGroupError({ message })))
        )
      )
    )
  );

  createItemGroupError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BudgetActions.createBudgetItemGroupError, BudgetActions.createBudgetItemInGroupError),
        pluck('message'),
        map((message: string) => {
          this.snackBar.open(message, 'Ok', { panelClass: 'snackbar-error' });
        })
      ),
    { dispatch: false }
  );

  createItemInGroup = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.createBudgetItemInGroup),
      withLatestFrom(this.store.pipe(select(selectCurrentBudgetId))),
      switchMap(([category, budgetId]: [ReturnType<typeof BudgetActions.createBudgetItemInGroup>, string]) =>
        this.budgetItemsService.createEmptyItemInGroup(category.categoryId, category.name, budgetId).pipe(
          map(() => BudgetActions.createBudgetItemInGroupSuccess()),
          catchError((message) => of(BudgetActions.createBudgetItemInGroupError({ message })))
        )
      )
    )
  );

  updateItemAmount = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.updateBudgetItemAmount),
      switchMap((value: ReturnType<typeof BudgetActions.updateBudgetItemAmount>) => {
        log.debug('updateItemAmount: ', value);
        return this.budgetItemsService.updateAmount(value).pipe(
          map(() => BudgetActions.updateBudgetItemAmountSuccess()),
          catchError((message) => of(BudgetActions.updateBudgetItemAmountError({ message })))
        );
      })
    )
  );
}
