import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeType } from '@angular/fire/firestore';
import { Transaction } from '@firebase/firestore-types';
import { Update } from '@ngrx/entity';
import { Category, PATH as CategoriesPath } from '@shared/categories';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { BudgetItem } from '../models';
import { CollectionName, createBudgetItemObservable } from './budget-items.service.utils';

type SubjectTracker = {
  [key: string]: { [key: string]: Subscription };
};

@Injectable({ providedIn: 'root' })
export class BudgetItemsService {
  readonly budgetItemAdds$ = new Subject<BudgetItem[]>();
  readonly budgetItemRemoves$ = new Subject<string[]>();
  readonly budgetItemUpdates$ = new Subject<Update<BudgetItem>[]>();
  private itemObservables: SubjectTracker = {};

  constructor(private db: AngularFirestore) {}

  private hasEntry(id: string, changeType: DocumentChangeType): boolean {
    return !!this.itemObservables[id] && !!this.itemObservables[id][changeType];
  }

  observeBudget(id: string, changeType: DocumentChangeType): void {
    if (!this.itemObservables[id]) {
      this.itemObservables[id] = {};
    }
    if (!this.hasEntry(id, changeType)) {
      if (changeType === 'added') {
        const itemAddObservable = createBudgetItemObservable(this.db, id, 'added') as Observable<BudgetItem[]>;
        this.itemObservables[id][changeType] = itemAddObservable.subscribe((d) => {
          this.budgetItemAdds$.next(d);
        });
      } else if (changeType === 'removed') {
        const itemRemoveObservable = createBudgetItemObservable(this.db, id, 'removed') as Observable<string[]>;
        this.itemObservables[id][changeType] = itemRemoveObservable.subscribe((d) => {
          this.budgetItemRemoves$.next(d);
        });
      } else if (changeType === 'modified') {
        const itemUpdateObservable = createBudgetItemObservable(this.db, id, 'modified') as Observable<Update<BudgetItem>[]>;
        this.itemObservables[id][changeType] = itemUpdateObservable.subscribe((d) => {
          this.budgetItemUpdates$.next(d);
        });
      }
    }
  }

  stopObservingBudget(id: string): void {
    if (!!id && !!this.itemObservables[id]) {
      this.itemObservables[id].added.unsubscribe();
      this.itemObservables[id].removed.unsubscribe();
      this.itemObservables[id].modified.unsubscribe();
      delete this.itemObservables[id];
    }
  }

  createEmptyItemGroup(category: Partial<Category>, budgetId: string): Observable<void> {
    const id = this.db.createId();
    const budgetItemId = this.db.createId();
    const budgetRef = this.db.collection(CollectionName).doc(budgetItemId).ref;
    const categoryRef = this.db.collection(CategoriesPath).doc(id).ref;

    return from(
      this.db.firestore.runTransaction((transaction: Transaction) => {
        return transaction.get(categoryRef).then((categoryDoc) => {
          transaction.set(budgetRef, { categoryId: categoryDoc.id, budgetId });
          transaction.set(categoryRef, { ...category });
        });
      })
    );
  }

  createEmptyItemInGroup(parentId: string, categoryName: string, budgetId: string): Observable<void> {
    const newCategory: Partial<Category> = {
      name: categoryName,
      parentId,
    };
    const categoryId = this.db.createId();
    const budgetItemId = this.db.createId();
    const budgetItemRef = this.db.collection(CollectionName).doc(budgetItemId).ref;
    const categoryRef = this.db.collection(CategoriesPath).doc(categoryId).ref;

    return from(
      this.db.firestore.runTransaction((transaction: Transaction) => {
        return transaction.get(categoryRef).then((categoryDoc) => {
          transaction.set(budgetItemRef, { categoryId: categoryDoc.id, budgetId });
          transaction.set(categoryRef, { ...newCategory });
        });
      })
    );
  }

  updateAmount({ budgetItemId, newAmount }: { budgetItemId: string; newAmount: number }): Observable<void> {
    return from(this.db.collection<BudgetItem[]>(CollectionName).doc<BudgetItem>(budgetItemId).update({ amount: newAmount }));
  }
}
