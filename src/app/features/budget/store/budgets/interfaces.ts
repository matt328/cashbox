import { Timestamp } from '@firebase/firestore-types';
import { EntityState } from '@ngrx/entity';

export interface ClientBudget {
  id: string;
  name: string;
  startDate: number;
  endDate: number;
}

export interface Budget {
  id: string;
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
}

export const sliceName = 'budgets';

export interface State extends EntityState<ClientBudget> {
  observing: boolean;
  fetching: boolean;
  sending: boolean;
  errorMessage: string | undefined;
}
