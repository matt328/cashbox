import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '@core/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const CollectionName = '/categories';

@Injectable({ providedIn: 'root' })
export class NewCategoriesService {
  constructor(private afs: AngularFirestore) {}

  getAllCategories(): Observable<Category[]> {
    const collectionRef = this.afs.collection<Category>(CollectionName);
    return collectionRef.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => ({
          ...action.payload.doc.data(),
          id: action.payload.doc.id,
        }));
      })
    );
  }
}
