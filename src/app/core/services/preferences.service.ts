import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Preferences } from '@core/models';
import { Observable } from 'rxjs';

const CollectionName = 'userpreferences';

@Injectable({ providedIn: 'root' })
export class PreferencesService {
  constructor(private afs: AngularFirestore) {}

  getPreferences(userId: string): Observable<Preferences | undefined> {
    return this.afs.collection<Preferences>(CollectionName).doc<Preferences>(userId).valueChanges();
  }

  updatePreferences(userId: string, update: Partial<Preferences>): Promise<void> {
    const doc = this.afs.collection<Preferences>(CollectionName).doc<Preferences>(userId);
    return doc.update(update);
  }
}
