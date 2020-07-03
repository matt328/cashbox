import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap, createFeatureSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { State as BudgetItemState } from './budgetItems/interfaces';
import { reducer as budgetItemsReducer } from './budgetItems/reducer';
import { State as BudgetsState } from './budgets/interfaces';
import { reducer as budgetsReducer } from './budgets/reducer';

export interface BudgetState {
  budgets: BudgetsState;
  budgetItems: BudgetItemState;
}

export const sliceName = 'budget';

export const budgetReducer: ActionReducerMap<BudgetState, Action> = {
  budgets: budgetsReducer,
  budgetItems: budgetItemsReducer,
};

export const FEATURE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<BudgetState>>('Budget Reducers');

export function getReducers(): ActionReducerMap<BudgetState> {
  return budgetReducer;
}

export const selectFeatureState: MemoizedSelector<object, BudgetState, DefaultProjectorFn<BudgetState>> = createFeatureSelector<
  BudgetState
>(sliceName);
