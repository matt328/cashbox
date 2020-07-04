import { NgModule } from '@angular/core';
import { AUTH_GUARD } from '../auth-guard.token';
import { MockAuthGuard } from './mock-auth.guard';

@NgModule({
  providers: [{ provide: AUTH_GUARD, useClass: MockAuthGuard }],
})
export class MockAuthGuardModule {}
