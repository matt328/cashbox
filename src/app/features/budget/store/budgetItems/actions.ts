import { BudgetItem } from '@core/models';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Category } from '@shared/categories';

export const startObservingItems = createAction('[Budgets] Start Observing Items', props<{ budgetId: string }>());
export const stopObservingItems = createAction('[Budgets] Stop Observing Items', props<{ budgetId: string }>());
export const addBudgetItem = createAction('[Budgets] Add Item', props<{ budgetItem: BudgetItem }>());
export const addBudgetItems = createAction('[Budgets] Add Multiple Items', props<{ budgetItems: BudgetItem[] }>());
export const updateBudgetItem = createAction('[Budgets] Update Item', props<{ update: Update<BudgetItem> }>());
export const updateBudgetItems = createAction('[Budgets] Update Multiple Items', props<{ updates: Update<BudgetItem>[] }>());
export const removeBudgetItem = createAction('[Budgets] Remove Item', props<{ id: string }>());
export const removeBudgetItems = createAction('[Budgets] Remove Multiple Items', props<{ ids: string[] }>());

export const createBudgetItemGroup = createAction('[Budgets] Create Item Group', props<Partial<Category>>());
export const createBudgetItemGroupSuccess = createAction('[Budgets] Create Item Group Success');
export const createBudgetItemGroupError = createAction('[Budgets] Create Item Group Error', props<{ message: string }>());

export const createBudgetItemInGroup = createAction(
  '[Budgets] Create Item In Group',
  props<{ categoryId: string; name: string }>()
);
export const createBudgetItemInGroupSuccess = createAction('[Budgets] Create Item In Group Success');
export const createBudgetItemInGroupError = createAction('[Budgets] Create Item In Group Error', props<{ message: string }>());

export const updateBudgetItemAmount = createAction(
  '[Budgets] Update Item Amount',
  props<{ budgetItemId: string; newAmount: number }>()
);
export const updateBudgetItemAmountSuccess = createAction('[Budgets] Update Item Amount Success');
export const updateBudgetItemAmountError = createAction('[Budgets] Update Item Amount Error', props<{ message: string }>());
