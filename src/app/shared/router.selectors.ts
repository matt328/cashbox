import { Params } from '@angular/router';
import { GlobalState } from '@core/models';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from './router-serializer';

export const selectRouter = createFeatureSelector<GlobalState, RouterReducerState<RouterStateUrl>>('router');

const selectState = createSelector(selectRouter, (s) => (s ? s.state : undefined));

export const selectPathParams = createSelector(selectState, (s) => s?.params);
export const selectQueryParams = createSelector(selectState, (s) => s?.queryParams);

export const selectPathParam = createSelector(selectPathParams, (params: Params | undefined, props: { name: string }) =>
  params ? params[props.name] : undefined
);

export const selectQueryParam = createSelector(selectQueryParams, (params: Params | undefined, props: { name: string }) =>
  params ? params[props.name] : undefined
);
