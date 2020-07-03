import { EntityState } from '@ngrx/entity';

export interface BudgetItem {
  id: string;
  categoryId: string;
  amount: number;
  budgetId: string;
}

export const sliceName = 'budgetItems';

export interface State extends EntityState<BudgetItem> {
  observing: string[];
  fetching: boolean;
  sending: boolean;
  errorMessage: string | undefined;
}

export interface ClientBudgetItem {
  id: string;
  categoryName: string;
  categoryId: string;
  amount: number;
  activity: number;
  available: number;
  children: ClientBudgetItem[];
}
