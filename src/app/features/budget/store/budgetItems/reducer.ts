import { BudgetItem } from '@core/models';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { without } from 'ramda';
import * as Actions from './actions';
import { State } from './interfaces';

export const adapter: EntityAdapter<BudgetItem> = createEntityAdapter<BudgetItem>();

const initialState: State = adapter.getInitialState({
  observing: [],
  fetching: false,
  sending: false,
  errorMessage: undefined,
});

const budgetItemReducer = createReducer(
  initialState,
  on(Actions.startObservingItems, (state, { budgetId }) => ({ ...state, observing: [...state.observing, budgetId] })),
  on(Actions.stopObservingItems, (state, { budgetId }) => ({
    ...state,
    observing: without([budgetId], state.observing),
  })),
  on(Actions.addBudgetItem, (state, { budgetItem }) => adapter.addOne(budgetItem, state)),
  on(Actions.addBudgetItems, (state, { budgetItems }) => adapter.addMany(budgetItems, state)),
  on(Actions.updateBudgetItem, (state, { update }) => adapter.updateOne(update, state)),
  on(Actions.updateBudgetItems, (state, { updates }) => adapter.updateMany(updates, state)),
  on(Actions.removeBudgetItem, (state, { id }) => adapter.removeOne(id, state)),
  on(Actions.removeBudgetItems, (state, { ids }) => adapter.removeMany(ids, state)),
  on(Actions.createBudgetItemGroup, Actions.createBudgetItemInGroup, Actions.updateBudgetItemAmount, (state) => ({
    ...state,
    sending: true,
  })),
  on(
    Actions.createBudgetItemGroupError,
    Actions.createBudgetItemInGroupError,
    Actions.createBudgetItemGroupSuccess,
    Actions.createBudgetItemInGroupSuccess,
    Actions.updateBudgetItemAmountSuccess,
    Actions.updateBudgetItemAmountError,
    (state) => ({ ...state, sending: false })
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return budgetItemReducer(state, action);
}

export const { selectEntities, selectAll, selectTotal } = adapter.getSelectors();
