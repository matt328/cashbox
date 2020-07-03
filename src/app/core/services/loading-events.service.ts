import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class LoadingEventsService {
  doc: Document;
  private isAppReady: boolean;

  constructor(@Inject(DOCUMENT) doc: Document) {
    this.doc = doc;
    this.isAppReady = false;
  }

  triggerAppReady(): void {
    if (this.isAppReady) {
      return;
    }
    const bubbles = true;
    const cancelable = false;
    this.doc.dispatchEvent(this.createEvent('appready', bubbles, cancelable));
    this.isAppReady = true;
  }

  private createEvent(eventType: string, bubbles: boolean, cancelable: boolean): Event {
    const customEvent: CustomEvent = new CustomEvent(eventType, {
      bubbles,
      cancelable,
    });
    return customEvent;
  }
}
