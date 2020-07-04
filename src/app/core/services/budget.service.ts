import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Budget, ClientBudget } from '@core/models';
import { Update } from '@ngrx/entity';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  budgetAdds$: Observable<ClientBudget[]>;
  budgetRemoves$: Observable<string[]>;
  budgetUpdates$: Observable<Update<ClientBudget>[]>;

  private subscriptionSubject$ = new Subject<void>();

  readonly subscription$ = this.subscriptionSubject$.asObservable();

  constructor(db: AngularFirestore) {
    this.budgetAdds$ = db
      .collection<Budget>('budgets')
      .stateChanges(['added'])
      .pipe(takeUntil(this.subscriptionSubject$), this.mapBudgetAdds());

    this.budgetRemoves$ = db
      .collection<Budget>('budgets')
      .stateChanges(['removed'])
      .pipe(takeUntil(this.subscriptionSubject$), this.mapBudgetRemoves());

    this.budgetUpdates$ = db
      .collection<Budget>('budgets')
      .stateChanges(['modified'])
      .pipe(takeUntil(this.subscriptionSubject$), this.mapBudgetUpdates());
  }

  stopObserving(): void {
    this.subscriptionSubject$.next();
  }

  createNextBudget(): void {}

  private mapBudgetAdds(): (source: Observable<DocumentChangeAction<Budget>[]>) => Observable<ClientBudget[]> {
    return (source: Observable<DocumentChangeAction<Budget>[]>) =>
      source.pipe(map((documentChanges) => documentChanges.map(this.unmarshallBudget)));
  }

  private mapBudgetRemoves(): (source: Observable<DocumentChangeAction<Budget>[]>) => Observable<string[]> {
    return (source: Observable<DocumentChangeAction<Budget>[]>) =>
      source.pipe(map((documentChanges) => documentChanges.map(this.getChangeId)));
  }

  private mapBudgetUpdates(): (source: Observable<DocumentChangeAction<Budget>[]>) => Observable<Update<ClientBudget>[]> {
    return (source: Observable<DocumentChangeAction<Budget>[]>) => source.pipe(map((dc) => dc.map(this.getBudgetUpdate)));
  }

  private unmarshallBudget(dc: DocumentChangeAction<Budget>): ClientBudget {
    const budget = dc.payload.doc.data();
    return {
      id: dc.payload.doc.id,
      name: budget.name,
      startDate: budget.startDate ? budget.startDate.toDate().getTime() : 0,
      endDate: budget.endDate ? budget.endDate.toDate().getTime() : 0,
    };
  }

  private getChangeId(dc: DocumentChangeAction<Budget>): string {
    return dc.payload.doc.id;
  }

  private getBudgetUpdate(dc: DocumentChangeAction<Budget>): Update<ClientBudget> {
    const id = dc.payload.doc.id;
    const budget = dc.payload.doc.data();
    const changes: Partial<ClientBudget> = {
      id: dc.payload.doc.id,
      name: budget.name,
      startDate: budget.startDate ? budget.startDate.toDate().getTime() : 0,
      endDate: budget.endDate ? budget.endDate.toDate().getTime() : 0,
    };
    return { id, changes };
  }
}
