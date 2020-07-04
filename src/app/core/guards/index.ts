import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const authGuardPipeFn = () => redirectUnauthorizedTo(['login']);

export { AUTH_GUARD } from './auth-guard.token';
