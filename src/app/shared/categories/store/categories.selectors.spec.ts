import { Category } from './categories.interfaces';
import { adapter } from './categories.reducer';
import {
  selectCategoriesErrorMessage,
  selectCategoryUIs,
  selectFetchingCategories,
  selectObservingCategories,
  selectSendingCategories,
} from './categories.selectors';

const flatCats: Category[] = [
  {
    id: '1',
    name: '1',
    parentId: null,
  },
  {
    id: '2',
    name: '2',
    parentId: null,
  },
  {
    id: '3',
    name: '3',
    parentId: null,
  },
];

describe('Category Selectors', () => {
  const defaultInitialState = adapter.getInitialState({
    isFetching: false,
    sending: [],
    isObserving: false,
    errorMessage: undefined,
  });

  describe('Simple Selectors', () => {
    it('should return observing categories', () => {
      const state = { ...defaultInitialState };
      const actual = selectObservingCategories.projector(state);
      expect(actual).toBeFalsy();
    });
    it('should return fetching categories', () => {
      const state = { ...defaultInitialState };
      const actual = selectFetchingCategories.projector(state);
      expect(actual).toBeFalsy();
    });
    it('should return sending categories', () => {
      const state = { ...defaultInitialState };
      const actual = selectSendingCategories.projector(state);
      expect(actual).toBeFalsy();
    });
    it('should return error message', () => {
      const state = { ...defaultInitialState, errorMessage: 'some_error' };
      const actual = selectCategoriesErrorMessage.projector(state);
      expect(actual).toEqual('some_error');
    });
  });

  describe('when categories are all flat', () => {
    const state = {
      ...defaultInitialState,
      entities: {
        1: flatCats[0],
        2: flatCats[1],
        3: flatCats[2],
      },
    };
    it('should return flat CategoryUIs', () => {
      const actual = selectCategoryUIs.projector(state, { ids: ['1', '2', '3'] });
      expect(actual).toBeDefined();
      expect(actual.length).toEqual(3);
      expect(actual[0]).toEqual(jasmine.objectContaining({ id: '1', name: '1', children: [] }));
      expect(actual[1]).toEqual(jasmine.objectContaining({ id: '2', name: '2', children: [] }));
      expect(actual[2]).toEqual(jasmine.objectContaining({ id: '3', name: '3', children: [] }));
    });
  });

  describe('with flat and nested categories', () => {
    const state = {
      ...defaultInitialState,
      entities: {
        1: { id: '1', name: '1', parentId: null },
        parent: { id: 'parent', name: 'Parent', parentId: null },
        child1: { id: 'child1', name: 'Child 1', parentId: 'parent' },
        child2: { id: 'child2', name: 'Child 2', parentId: 'parent' },
      },
    };
    it('should return non flat CategoryUIs', () => {
      const actual = selectCategoryUIs.projector(state, { ids: ['1', 'parent', 'child1', 'child2'] });
      expect(actual).toBeDefined();
      expect(actual.length).toEqual(2);
      expect(actual[1].children.length).toEqual(2);
    });
  });
});
