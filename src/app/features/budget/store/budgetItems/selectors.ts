import { Params } from '@angular/router';
import { BudgetItem, ClientBudget, ClientBudgetItem } from '@core/models';
import { createSelector } from '@ngrx/store';
import { CategoryUI, getCategoriesState, State } from '@shared/categories';
import { selectPathParams } from '@shared/router';
import { arrayToTree, Item } from 'performant-array-to-tree';
import { groupBy, props } from 'ramda';
import { selectMostRecentBudget } from '../budgets/selectors';
import { selectFeatureState } from '../interfaces';
import { selectAll, selectEntities, selectTotal } from './reducer';
import { categoryUIToClientBudgetItem } from './utils';

const selectBudgetItemState = createSelector(selectFeatureState, (s) => s.budgetItems);
export const selectBudgetItemEntities = createSelector(selectBudgetItemState, selectEntities);
export const selectAllBudgetItems = createSelector(selectBudgetItemState, selectAll);
export const selectBudgetItemTotal = createSelector(selectBudgetItemState, selectTotal);

export const selectCurrentBudgetId = createSelector(
  selectPathParams,
  selectMostRecentBudget,
  (pathParams: Params | undefined, recentBudget: ClientBudget) => {
    return pathParams?.id ? pathParams?.id : recentBudget?.id ? recentBudget?.id : '';
  }
);

export const selectCurrentBudgetItems = createSelector(
  selectCurrentBudgetId,
  selectAllBudgetItems,
  (currentBudgetId: string, budgetItems: BudgetItem[]) => {
    return budgetItems.filter((budgetItem) => budgetItem?.budgetId === currentBudgetId);
  }
);

export const selectCurrentBudgetCategoryUIs = createSelector(
  getCategoriesState,
  selectCurrentBudgetItems,
  (cs: State, budgetItems: BudgetItem[]) => {
    const currentBudgetIds = budgetItems.map((b) => b?.categoryId);
    const categoryUIs = arrayToTree(props(currentBudgetIds, cs.entities) as Item[], { dataField: null });
    return categoryUIs as CategoryUI[];
  }
);

export const selectCurrentClientBudgetItems = createSelector(
  selectCurrentBudgetItems,
  selectCurrentBudgetCategoryUIs,
  (allBudgetItems: BudgetItem[], categoryUIs: CategoryUI[]): ClientBudgetItem[] => {
    const allBudgetItemsMap = groupBy((c: BudgetItem) => c.categoryId)(allBudgetItems);
    return categoryUIToClientBudgetItem(categoryUIs, allBudgetItemsMap) as ClientBudgetItem[];
  }
);
