import { Injectable } from '@angular/core';
import { User } from '@core/models';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service.interface';

@Injectable()
export class MockAuthService implements AuthService {
  user$: Observable<User | null> = of({
    uid: 'uid',
    displayName: 'Fake User',
    photoUrl: 'some-url',
    email: 'some-email',
  });

  constructor() {
    log.info('Constructed Mock Auth Service');
  }

  async signInWithPopup(): Promise<boolean> {
    return true;
  }
}
