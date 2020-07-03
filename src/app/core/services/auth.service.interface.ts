import { InjectionToken } from '@angular/core';
import { User } from '@core/models';
import { Observable } from 'rxjs';

export interface AuthService {
  user$: Observable<User | null>;
  signInWithPopup(): Promise<boolean>;
}

export const AUTH_SERVICE = new InjectionToken<AuthService>('auth.service');
