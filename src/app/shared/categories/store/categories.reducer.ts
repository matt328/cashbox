import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as R from 'ramda';
import * as Actions from './categories.actions';
import { Category, State } from './categories.interfaces';

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

const initialState: State = adapter.getInitialState({
  isFetching: false,
  sending: [],
  isObserving: false,
  errorMessage: undefined,
});

const categoriesReducer = createReducer(
  initialState,
  on(Actions.observeCategories, (state) => ({ ...state, isObserving: true })),
  on(Actions.stopObservingCategories, (state) => ({ ...state, isObserving: false })),
  on(Actions.addCategories, (state, { categories }) => adapter.addMany(categories, state)),
  on(Actions.addCategory, (state, { category }) => ({
    ...adapter.addOne(category, state),
    sending: removeFromSending(state.sending, category),
  })),
  on(Actions.loadCategories, (state, { categories }) => adapter.addMany(categories, state)),
  on(Actions.updateCategory, (state, { update }) => adapter.updateOne(update, state)),
  on(Actions.updateCategories, (state, { updates }) => adapter.updateMany(updates, state)),
  on(Actions.createCategory, (state, { category }) => ({ ...state, sending: [...state.sending, category] })),
  on(Actions.createCategoryRollback, (state, { category }) => ({
    ...state,
    sending: removeFromSending(state.sending, category),
  }))
);

const removeFromSending = (state: Partial<Category>[], category: Category): Partial<Category>[] => {
  const matches = (c: Partial<Category>) => c.name === category.name;
  return R.reject(matches, state);
};

export function reducer(state: State, action: Action): State {
  return categoriesReducer(state, action);
}
