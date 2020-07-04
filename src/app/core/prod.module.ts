import { NgModule } from '@angular/core';
import { FirebaseAuthGuardModule } from './guards/firebase/firebase-auth-guard.module';
import { AUTH_SERVICE } from './services/auth.service.interface';
import { FirebaseAuthService } from './services/firebase/firebase-auth.service';

@NgModule({
  imports: [FirebaseAuthGuardModule],
  providers: [{ provide: AUTH_SERVICE, useClass: FirebaseAuthService }],
})
export class ProdModule {}
