import { createSelector } from '@ngrx/store';
import { selectPathParams } from '@shared/router';
import { selectFeatureState } from '../interfaces';
import { ClientBudget } from './interfaces';
import { selectAll, selectEntities, selectTotal } from './reducer';

export const selectBudgetsState = createSelector(selectFeatureState, (s) => s?.budgets);
export const selectBudgetEntities = createSelector(selectBudgetsState, selectEntities);
export const selectAllBudgets = createSelector(selectBudgetsState, selectAll);
export const selectBudgetTotal = createSelector(selectBudgetsState, selectTotal);

export const selectBudgetSummaries = createSelector(selectAllBudgets, (budgets: ClientBudget[]) =>
  budgets
    .filter((x) => x !== undefined)
    .sort((a, b) => {
      const bStartDate = b?.startDate;
      const aStartDate = a?.startDate;
      if (bStartDate && aStartDate) {
        return bStartDate - aStartDate;
      } else if (bStartDate && !aStartDate) {
        return -1;
      } else if (aStartDate && !bStartDate) {
        return 1;
      } else {
        return 0;
      }
    })
    .map((budget) => ({ name: budget?.name, id: budget?.id }))
);

export const selectMostRecentBudget = createSelector(
  selectAllBudgets,
  (budgets: ClientBudget[]) => budgets.sort((b1, b2) => b2.endDate - b1.endDate)[0]
);

export const selectCurrentBudget = createSelector(
  selectBudgetsState,
  selectPathParams,
  selectMostRecentBudget,
  (s, pathParams, mostRecentBudget) => {
    const budgetId = pathParams?.id ? pathParams.id : mostRecentBudget ? mostRecentBudget.id : undefined;
    if (!!budgetId && !!s.entities[budgetId]) {
      const budget: ClientBudget | undefined = s.entities[budgetId];
      return budget;
    } else {
      return undefined;
    }
  }
);
