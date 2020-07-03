import { Update } from '@ngrx/entity/src/models';
import { createAction, props } from '@ngrx/store';
import { Category } from './categories.interfaces';

export const observeCategories = createAction('[Category] Start Observing Categories');
export const stopObservingCategories = createAction('[Category] Stop Observing Categories');
export const loadCategories = createAction('[Category] Load Categories', props<{ categories: Category[] }>());
export const addCategory = createAction('[Category] Add Category', props<{ category: Category }>());
export const addCategories = createAction('[Category] Add Categories', props<{ categories: Category[] }>());
export const updateCategory = createAction('[Category] Update Category', props<{ update: Update<Category> }>());
export const updateCategories = createAction('[Category] Update Categories', props<{ updates: Update<Category>[] }>());
export const deleteCategories = createAction('[Category] Delete Categories', props<{ ids: string[] }>());
export const createCategory = createAction('[Category] Create', props<{ category: Partial<Category> }>());
export const createCategoryCommit = createAction('[Category] Create Commit', props<{ category: Category }>());
export const createCategoryRollback = createAction('[Category] Create Rollback', props<{ category: Category }>());
