import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@core/models';
import { auth, User as FirebaseUser } from 'firebase';
import { BehaviorSubject, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service.interface';

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
export class FirebaseAuthService implements AuthService {
  private user = new BehaviorSubject<FirebaseUser | null>(null);
  user$ = this.user.pipe(toUser);

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
}
