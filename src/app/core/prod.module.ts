import { NgModule } from '@angular/core';
import { AUTH_SERVICE } from './services/auth.service.interface';
import { FirebaseAuthService } from './services/firebase/firebase-auth.service';

@NgModule({
  providers: [{ provide: AUTH_SERVICE, useClass: FirebaseAuthService }],
})
export class ProdModule {}
