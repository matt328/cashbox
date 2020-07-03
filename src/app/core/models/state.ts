import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../../shared/router-serializer';

export interface GlobalState {
  router: RouterReducerState<RouterStateUrl>;
}
