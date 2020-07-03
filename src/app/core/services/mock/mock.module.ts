import { NgModule } from '@angular/core';
import { AUTH_SERVICE } from '../auth.service.interface';
import { MockAuthService } from './mock-auth.service';

@NgModule({
  providers: [{ provide: AUTH_SERVICE, useClass: MockAuthService }],
})
export class MockModule {}
