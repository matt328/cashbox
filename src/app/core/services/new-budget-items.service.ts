import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BudgetItem } from '@core/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const CollectionName = 'budgetitems';

@Injectable({ providedIn: 'root' })
export class NewBudgetItemsService {
  private budgetItemCollectionRef = this.afs.collection<BudgetItem>(CollectionName);

  constructor(private afs: AngularFirestore) {}

  getItemsForBudget(id: string): Observable<BudgetItem[]> {
    const collectionRef = this.afs.collection<BudgetItem>(CollectionName, (ref) => ref.where('budgetId', '==', id));
    return collectionRef.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => ({
          ...action.payload.doc.data(),
          id: action.payload.doc.id,
        }));
      }),
      tap((x) => log.debug('budgetItem: ', { x }))
    );
  }
}
