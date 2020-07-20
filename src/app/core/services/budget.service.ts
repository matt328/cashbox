import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Budget, ClientBudget } from '@core/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const CollectionName = 'budgets';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  constructor(private afs: AngularFirestore) {}

  getAllBudgets(): Observable<ClientBudget[]> {
    const collectionRef = this.afs.collection<Budget>(CollectionName);
    return collectionRef.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => {
          const budget = action.payload.doc.data();
          return {
            id: action.payload.doc.id,
            name: budget.name,
            startDate: budget.startDate ? budget.startDate.toDate().getTime() : 0,
            endDate: budget.endDate ? budget.endDate.toDate().getTime() : 0,
          };
        });
      })
    );
  }
}
