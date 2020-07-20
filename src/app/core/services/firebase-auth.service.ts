import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User as FirebaseUser } from 'firebase/app';
import { BehaviorSubject, pipe } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { User } from '../models';

const toUser = pipe(
  map((fb: FirebaseUser | null): User | null => {
    if (fb === null) {
      return null;
    } else {
      return {
        displayName: fb.displayName || '',
        email: fb.email || '',
        photoUrl: fb.photoURL || '',
        uid: fb.uid,
      };
    }
  })
);

@Injectable()
export class FirebaseAuthService {
  private user = new BehaviorSubject<FirebaseUser | null>(null);
  user$ = this.user.pipe(toUser, share());

  constructor(private angularFireAuth: AngularFireAuth) {
    log.info('Constructed Firebase Auth Service');
    angularFireAuth.authState.subscribe((user) => {
      this.user.next(user);
    });
  }

  async signInWithPopup(): Promise<boolean> {
    let result = true;
    try {
      await this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {
      result = false;
      log.error('Error logging in: ', error);
    }
    return result;
  }

  signOut(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}
