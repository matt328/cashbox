import { InjectionToken } from '@angular/core';
import { CanActivate } from '@angular/router';

export const AUTH_GUARD = new InjectionToken<CanActivate>('auth.guard');
