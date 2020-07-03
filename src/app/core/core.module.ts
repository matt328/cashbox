import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingEventsService } from './services/loading-events.service';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule],
  providers: [LoadingEventsService],
})
export class CoreModule {}
