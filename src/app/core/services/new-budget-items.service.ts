import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BudgetItem, Category } from '@core/models';
import { Transaction } from '@firebase/firestore-types';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const CollectionName = 'budgetitems';

@Injectable({ providedIn: 'root' })
export class NewBudgetItemsService {
  constructor(private afs: AngularFirestore) {}

  getItemsForBudget(id: string): Observable<BudgetItem[]> {
    const collectionRef = this.afs.collection<BudgetItem>(CollectionName, (ref) => ref.where('budgetId', '==', id));
    return collectionRef.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => ({
          ...action.payload.doc.data(),
          id: action.payload.doc.id,
        }));
      })
    );
  }

  createCategory(budgetId: string, category: Partial<Category>): Observable<void> {
    const id = this.afs.createId();
    const budgetItemId = this.afs.createId();
    const budgetRef = this.afs.collection<BudgetItem[]>(CollectionName).doc<BudgetItem>(budgetItemId).ref;
    const categoryRef = this.afs.collection<Category>('categories').doc(id).ref;

    return defer(() =>
      this.afs.firestore.runTransaction(async (transaction: Transaction) => {
        const categoryDoc = await transaction.get(categoryRef);
        transaction.set(budgetRef, { categoryId: categoryDoc.id, budgetId } as Partial<BudgetItem>);
        transaction.set(categoryRef, { ...category });
      })
    );
  }

  updateBudgetItemAmount(budgetId: string, updatedAmount: number): Observable<void> {
    return defer(() =>
      this.afs.collection<BudgetItem[]>(CollectionName).doc<BudgetItem>(budgetId).update({ amount: updatedAmount })
    );
  }
}
