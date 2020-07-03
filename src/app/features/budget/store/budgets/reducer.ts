import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from './actions';
import { ClientBudget, State } from './interfaces';

export const adapter: EntityAdapter<ClientBudget> = createEntityAdapter<ClientBudget>();

const initialState: State = adapter.getInitialState({
  observing: false,
  fetching: false,
  sending: false,
  errorMessage: undefined,
});

const budgetReducer = createReducer(
  initialState,
  on(Actions.startObserving, (state) => ({ ...state, observing: true })),
  on(Actions.stopObserving, (state) => ({ ...state, observing: false })),
  on(Actions.addBudget, (state, { budget }) => adapter.addOne(budget, state)),
  on(Actions.addBudgets, (state, { budgets }) => adapter.addMany(budgets, state)),
  on(Actions.updateBudget, (state, { update }) => adapter.updateOne(update, state)),
  on(Actions.updateBudgets, (state, { updates }) => adapter.updateMany(updates, state)),
  on(Actions.removeBudget, (state, { id }) => adapter.removeOne(id, state)),
  on(Actions.removeBudgets, (state, { ids }) => adapter.removeMany(ids, state)),

  on(Actions.createNextBudget, (state) => ({ ...state, sending: true }))
);

export function reducer(state: State | undefined, action: Action): State {
  return budgetReducer(state, action);
}

export const { selectEntities, selectAll, selectTotal } = adapter.getSelectors();
