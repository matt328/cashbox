import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '@shared/router';

export interface GlobalState {
  router: RouterReducerState<RouterStateUrl>;
}
