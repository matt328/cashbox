import { Injectable } from '@angular/core';
import { BudgetItem, Category, CategoryUI, ClientBudgetItem } from '@core/models';
import { NewBudgetItemsService, NewCategoriesService } from '@core/services';
import { arrayToTree, Item } from 'performant-array-to-tree';
import { groupBy } from 'ramda';
import { combineLatest, EMPTY, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const combineCategoriesAndBudgets = pipe(
  map(([categories, budgetItems]: [Category[], BudgetItem[]]): ClientBudgetItem[] => {
    const budgetItemsMap = groupBy((c: BudgetItem) => c.categoryId)(budgetItems);
    categories = categories.filter((cat) => budgetItemsMap[cat.id]);
    const categoryUis: CategoryUI[] = arrayToTree(categories as Item[], { dataField: null }) as CategoryUI[];
    return categoryUIToClientBudgetItem(categoryUis, budgetItemsMap);
  })
);

const categoryUIToClientBudgetItem = (
  categoryUis: CategoryUI[],
  budgetItemMap: { [key: string]: BudgetItem[] }
): ClientBudgetItem[] => {
  return ([] as ClientBudgetItem[]).concat(
    ...categoryUis.map((category): ClientBudgetItem[] =>
      budgetItemMap[category.id].map((budgetItem) => {
        const children = categoryUIToClientBudgetItem(category.children, budgetItemMap);
        const amount =
          children.length > 0
            ? children.reduce((acc, child) => acc + (child.amount ? child.amount : 0), 0)
            : budgetItem.amount
            ? budgetItem.amount
            : 0;
        const activity =
          children.length > 0 ? children.reduce((acc, child) => acc + (child.activity ? child.activity : 0), 0) : 0;
        return {
          amount,
          available: amount - activity,
          activity,
          categoryName: category.name,
          categoryId: category.id,
          id: budgetItem.id,
          children,
        };
      })
    )
  );
};

@Injectable()
export class NewBudgetFacade {
  constructor(private categoriesService: NewCategoriesService, private budgetItemsService: NewBudgetItemsService) {}

  getBudgetItemsForBudget(id: string): Observable<ClientBudgetItem[]> {
    if (!id) {
      return EMPTY;
    }
    const budgetsAndCategories$: [Observable<Category[]>, Observable<BudgetItem[]>] = [
      this.categoriesService.getAllCategories(),
      this.budgetItemsService.getItemsForBudget(id),
    ];
    return combineLatest(budgetsAndCategories$).pipe(combineCategoriesAndBudgets);
  }
}
