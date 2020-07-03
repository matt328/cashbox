import { EntityState } from '@ngrx/entity';

export const sliceName = 'categories';

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

export interface CategoryUI {
  id: string;
  name: string;
  children: CategoryUI[];
}

export interface State extends EntityState<Category> {
  isFetching: boolean;
  sending: Partial<Category>[];
  isObserving: boolean;
  errorMessage: string | undefined;
}
