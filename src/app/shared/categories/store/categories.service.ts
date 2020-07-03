import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DocumentChangeAction } from '@angular/fire/firestore/interfaces';
import { Update } from '@ngrx/entity/src/models';
import { Store } from '@ngrx/store';
import 'firebase/firestore';
import { Observable, Subscription, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CategoryActions from './categories.actions';
import { Category, State } from './categories.interfaces';
import { selectObservingCategories } from './categories.selectors';

export const PATH = '/categories';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private addSubscription?: Subscription;
  private modifySubscription?: Subscription;
  private removeSubscription?: Subscription;

  constructor(private afs: AngularFirestore, private store: Store<State>) {
    this.store.select(selectObservingCategories).subscribe((observing: boolean) => {
      if (observing) {
        this.addSubscription = this.afs
          .collection<Category>(PATH)
          .stateChanges(['added'])
          .pipe(map(this.extractCategory, this))
          .subscribe((categories: Category[]) => {
            this.store.dispatch(CategoryActions.addCategories({ categories }));
          });

        this.modifySubscription = this.afs
          .collection<Category>(PATH)
          .stateChanges(['modified'])
          .pipe(map(this.extractCategoryUpdates, this))
          .subscribe((updates: Update<Category>[]) => {
            this.store.dispatch(CategoryActions.updateCategories({ updates }));
          });
        this.removeSubscription = this.afs
          .collection<Category>(PATH)
          .stateChanges(['removed'])
          .pipe(map(this.extractCategoryIds, this))
          .subscribe((ids: string[]) => {
            this.store.dispatch(CategoryActions.deleteCategories({ ids }));
          });
      } else if (!observing) {
        if (this.addSubscription) {
          this.addSubscription.unsubscribe();
        }
        if (this.removeSubscription) {
          this.removeSubscription.unsubscribe();
        }
        if (this.modifySubscription) {
          this.modifySubscription.unsubscribe();
        }
      }
    });
  }

  saveCategory(newCategory: Partial<Category>): Observable<string> {
    return throwError('I am sorry this happened to you');
    // return from(this.afs.collection<Partial<Category>>(CategoriesService.PATH).add(newCategory)).pipe(
    //   map(doc => doc.id)
    // );
  }

  private extractCategoryUpdates(actions: DocumentChangeAction<Category>[]): Update<Category>[] {
    return actions.map((action: DocumentChangeAction<Category>) => {
      return {
        id: action.payload.doc.id,
        changes: action.payload.doc.data(),
      };
    });
  }

  private extractCategoryIds(actions: DocumentChangeAction<Category>[]): string[] {
    return actions.map((action: DocumentChangeAction<Category>) => {
      return action.payload.doc.id;
    });
  }

  private extractCategory(actions: DocumentChangeAction<Category>[]): Category[] {
    return actions.map((a: DocumentChangeAction<Category>) => {
      const category: Category = {
        id: a.payload.doc.id,
        name: a.payload.doc.data().name,
        parentId: a.payload.doc.data().parentId ? a.payload.doc.data().parentId : null,
      };
      return category;
    });
  }
}
