import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AUTH_GUARD } from '../auth-guard.token';

@NgModule({
  imports: [AngularFireAuthGuardModule],
  providers: [{ provide: AUTH_GUARD, useExisting: AngularFireAuthGuard }],
})
export class FirebaseAuthGuardModule {}
