import { createFeatureSelector, createSelector } from '@ngrx/store';
import { arrayToTree, Item } from 'performant-array-to-tree';
import * as R from 'ramda';
import { CategoryUI, State } from './categories.interfaces';
import { adapter } from './categories.reducer';

export const getCategoriesState = createFeatureSelector<State>('category');

export const { selectAll: selectCategories, selectEntities: selectCategoryEntities } = adapter.getSelectors(getCategoriesState);

export const selectObservingCategories = createSelector(getCategoriesState, (state: State) => state.isObserving);

export const selectFetchingCategories = createSelector(getCategoriesState, (state: State) => state.isFetching);

export const selectSendingCategories = createSelector(getCategoriesState, (state: State) => state.sending.length > 0);

export const selectCategoriesErrorMessage = createSelector(getCategoriesState, (state: State) => state.errorMessage);

export const selectCategoryUIs = createSelector(getCategoriesState, (state: State, props: { ids: string[] }) => {
  return arrayToTree(R.props(props.ids, state.entities) as Item[], { dataField: null }) as CategoryUI[];
});
