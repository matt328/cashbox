import { Injectable } from '@angular/core';
import { GlobalState } from '@core/models';
import { Store } from '@ngrx/store';
import { Category } from '@shared/categories';
import { createBudgetItemGroup, createBudgetItemInGroup, updateBudgetItemAmount } from '../../../store/budgetItems/actions';

@Injectable({ providedIn: 'root' })
export class BudgetItemListFacade {
  constructor(private store: Store<GlobalState>) {}

  createBudgetItemGroup(name: string): void {
    const category: Partial<Category> = {
      name,
    };
    this.store.dispatch(createBudgetItemGroup(category));
  }

  createBudgetItem(info: { categoryId: string; name: string }): void {
    this.store.dispatch(createBudgetItemInGroup(info));
  }

  updateBudgetItemAmount(info: { budgetItemId: string; newAmount: number }): void {
    this.store.dispatch(updateBudgetItemAmount(info));
  }
}
