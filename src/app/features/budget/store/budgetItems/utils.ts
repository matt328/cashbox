import { CategoryUI } from '@shared/categories/store/categories.interfaces';
import { BudgetItem, ClientBudgetItem } from './interfaces';

/**
 * Matches up BudgetItems with the corresponding category heirarchy.
 *
 * @param categories - an array of CategoryUIs
 * @param budgetItemMap - a list of BudgetItems, grouped by category ID
 */
export const categoryUIToClientBudgetItem = (
  categories: CategoryUI[],
  budgetItemMap: { [key: string]: BudgetItem[] }
): ClientBudgetItem[] => {
  return ([] as ClientBudgetItem[]).concat(
    ...categories.map((category): ClientBudgetItem[] =>
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
