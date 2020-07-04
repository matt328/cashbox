import { NgModule } from '@angular/core';
import { MockAuthGuardModule } from './guards/mock/mock-auth-guard.module';
import { AUTH_SERVICE } from './services/auth.service.interface';
import { MockAuthService } from './services/mock/mock-auth.service';

@NgModule({
  imports: [MockAuthGuardModule],
  providers: [{ provide: AUTH_SERVICE, useClass: MockAuthService }],
})
export class MockModule {}
