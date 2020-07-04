import { ClientBudget } from '@core/models';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const startObserving = createAction('[Budgets] Start Observing');
export const stopObserving = createAction('[Budgets] Stop Observing');
export const addBudget = createAction('[Budgets] Add', props<{ budget: ClientBudget }>());
export const addBudgets = createAction('[Budgets] Add Multiple', props<{ budgets: ClientBudget[] }>());
export const updateBudget = createAction('[Budgets] Update', props<{ update: Update<ClientBudget> }>());
export const updateBudgets = createAction('[Budgets] Update Multiple', props<{ updates: Update<ClientBudget>[] }>());
export const removeBudget = createAction('[Budgets] Remove', props<{ id: string }>());
export const removeBudgets = createAction('[Budgets] Remove Multiple', props<{ ids: string[] }>());

export const setCurrentBudget = createAction('[Budgets] Set Current', props<{ budgetId: string }>());
export const createNextBudget = createAction('[Budgets] Create Next');
