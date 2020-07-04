import { Timestamp } from '@firebase/firestore-types';

export interface BudgetItem {
  id: string;
  categoryId: string;
  amount: number;
  budgetId: string;
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
