import { AngularFirestore, DocumentChangeAction, DocumentChangeType } from '@angular/fire/firestore';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BudgetItem } from '../models';

export const CollectionName = 'budgetitems';

export const toBudgetItem = (dc: DocumentChangeAction<BudgetItem>): BudgetItem => ({
  ...dc.payload.doc.data(),
  id: dc.payload.doc.id,
});

export const getBudgetItemUpdate = (dc: DocumentChangeAction<BudgetItem>): Update<BudgetItem> => {
  const id = dc.payload.doc.id;
  const changes: Partial<BudgetItem> = dc.payload.doc.data();
  return { id, changes };
};

export const mapBudgetItemChanges = (
  changeType: DocumentChangeType
): ((source: Observable<DocumentChangeAction<BudgetItem>[]>) => Observable<BudgetItem[] | string[] | Update<BudgetItem>[]>) => {
  if (changeType === 'added') {
    return (source: Observable<DocumentChangeAction<BudgetItem>[]>) =>
      source.pipe(map((documentChanges) => documentChanges.map(toBudgetItem)));
  } else if (changeType === 'removed') {
    return (source: Observable<DocumentChangeAction<BudgetItem>[]>) =>
      source.pipe(map((documentChanges) => documentChanges.map((dc) => dc.payload.doc.id)));
  } else if (changeType === 'modified') {
    return (source: Observable<DocumentChangeAction<BudgetItem>[]>) =>
      source.pipe(map((documentChanges) => documentChanges.map(getBudgetItemUpdate)));
  } else {
    return (source: Observable<DocumentChangeAction<BudgetItem>[]>) =>
      source.pipe(map((documentChanges) => documentChanges.map(getBudgetItemUpdate)));
  }
};

export const createBudgetItemObservable = (
  db: AngularFirestore,
  id: string,
  changeType: DocumentChangeType
): Observable<BudgetItem[] | string[] | Update<BudgetItem>[]> => {
  return db
    .collection<BudgetItem>(CollectionName, (ref) => ref.where('budgetId', '==', id))
    .stateChanges([changeType])
    .pipe(mapBudgetItemChanges(changeType));
};
