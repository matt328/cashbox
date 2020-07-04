import { BudgetItem } from '@core/models';
import { EntityState } from '@ngrx/entity';

export const sliceName = 'budgetItems';

export interface State extends EntityState<BudgetItem> {
  observing: string[];
  fetching: boolean;
  sending: boolean;
  errorMessage: string | undefined;
}
