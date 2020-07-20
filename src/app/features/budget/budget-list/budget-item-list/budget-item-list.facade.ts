import { Injectable } from '@angular/core';
import { Category } from '@core/models';
import { NewBudgetItemsService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable()
export class BudgetItemListFacade {
  constructor(private budgetItemService: NewBudgetItemsService) {}

  createChildCategory(categoryId: string, budgetItemName: string, budgetId: string): Observable<void> {
    return this.budgetItemService.createCategory(budgetId, { name: budgetItemName, parentId: categoryId });
  }

  updateBudgetItemAmount(item: { budgetItemId: string; newAmount: number }): Observable<void> {
    return this.budgetItemService.updateBudgetItemAmount(item.budgetItemId, item.newAmount);
  }

  createTopLevelCategory(name: string, budgetId: string): Observable<void> {
    return this.budgetItemService.createCategory(budgetId, { name });
  }

  createCategory(budgetId: string, categoryName: string, parentCategoryId?: string): Observable<void> {
    const category: Partial<Category> = { name: categoryName, parentId: parentCategoryId };
    return this.budgetItemService.createCategory(budgetId, category);
  }
}
