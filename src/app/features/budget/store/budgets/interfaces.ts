import { ClientBudget } from '@core/models';
import { EntityState } from '@ngrx/entity';

export const sliceName = 'budgets';

export interface State extends EntityState<ClientBudget> {
  observing: boolean;
  fetching: boolean;
  sending: boolean;
  errorMessage: string | undefined;
}
