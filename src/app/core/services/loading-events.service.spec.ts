import { Mock } from 'ts-mocks';
import { LoadingEventsService } from './loading-events.service';

describe('LoadingEventsService', () => {
  let loadingEventsService: LoadingEventsService;
  let doc: Mock<Document>;

  beforeEach(() => {
    doc = new Mock<Document>({
      dispatchEvent: (event: Event) => true,
    });

    loadingEventsService = new LoadingEventsService(doc.Object);
  });

  it('should be created', () => {
    expect(loadingEventsService).toBeDefined();
  });

  it('should trigger an event', () => {
    const customEvent = new CustomEvent('appready', {
      bubbles: true,
      cancelable: false,
    });
    loadingEventsService.triggerAppReady();
    expect(doc.Object.dispatchEvent).toHaveBeenCalledWith(customEvent);
  });

  it('should not trigger an event twice', () => {
    const customEvent = new CustomEvent('appready', {
      bubbles: true,
      cancelable: false,
    });
    loadingEventsService.triggerAppReady();
    expect(doc.Object.dispatchEvent).toHaveBeenCalledWith(customEvent);

    loadingEventsService.triggerAppReady();
    expect(doc.Object.dispatchEvent).toHaveBeenCalledTimes(1);
  });
});
