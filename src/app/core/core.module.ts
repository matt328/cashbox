import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { LoadingEventsService } from './services/loading-events.service';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule],
  providers: [LoadingEventsService, FirebaseAuthService],
})
export class CoreModule {}
