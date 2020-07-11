import { Injectable } from '@angular/core';

@Injectable()
export class BudgetItemListFacade {
  createBudgetItem(item: { categoryId: string; name: string }): void {}
  updateBudgetItemAmount(item: { budgetItemId: string; newAmount: number }): void {}
  createBudgetItemGroup(item: string): void {}
}
