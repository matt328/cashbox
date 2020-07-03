import { AngularFirestore, DocumentChangeType } from '@angular/fire/firestore';
import { EMPTY, of } from 'rxjs';
import { Mock } from 'ts-mocks';

const mockAdd = <T extends { id: string }>(thing: T) => ({
  payload: {
    doc: {
      id: thing.id,
      data: () => thing,
    },
  },
});

const mockRemove = (id: string) => ({
  payload: { doc: { id } },
});

export const createTimestamp = (time: number) => ({
  toDate: () => new Date(time),
  seconds: 0,
  nanoseconds: 0,
  toMillis: () => 0,
  isEqual: () => true,
});

interface Items<T> {
  adds?: T[];
  removes?: string[];
  updates?: T[];
}

export const mockFirestoreEvents = <T extends { id: string }>(items: Items<T>): Mock<AngularFirestore> => {
  const mockThingAdds = items.adds ? items.adds.map(mockAdd) : [];
  const mockThingRemoves = items.removes ? items.removes.map(mockRemove) : [];
  const mockThingUpdates = items.updates ? items.updates.map(mockAdd) : [];
  return new Mock<AngularFirestore>({
    collection: <T>(name: string) => ({
      stateChanges: <T>(changeType: DocumentChangeType[]) => {
        if (changeType.includes('added')) {
          return mockThingAdds.length > 0 ? of(mockThingAdds) : EMPTY;
        } else if (changeType.includes('removed')) {
          return mockThingRemoves.length > 0 ? of(mockThingRemoves) : EMPTY;
        } else {
          return mockThingUpdates.length > 0 ? of(mockThingUpdates) : EMPTY;
        }
      },
    }),
  } as any);
};
