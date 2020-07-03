import { AngularFirestore } from '@angular/fire/firestore';
import { Update } from '@ngrx/entity';
import { Mock } from 'ts-mocks';
import { createTimestamp, mockFirestoreEvents } from '../../testing-utils';
import { BudgetService } from './budget.service';
import { ClientBudget } from './store/budgets/interfaces';

describe('Budget Service', () => {
  let angularFirestore: Mock<AngularFirestore>;
  let service: BudgetService;

  describe('budget adds', () => {
    const added1 = { id: 'some_id', endDate: createTimestamp(10), startDate: createTimestamp(11), name: 'some_name' };
    const expected1 = { id: 'some_id', name: 'some_name', startDate: 11, endDate: 10 };

    const added2 = { id: 'some_id2', endDate: createTimestamp(10), startDate: createTimestamp(11), name: 'some_name2' };
    const expected2 = { id: 'some_id2', name: 'some_name2', startDate: 11, endDate: 10 };

    beforeEach(() => {
      angularFirestore = mockFirestoreEvents({ adds: [added1, added2] });
      service = new BudgetService(angularFirestore.Object);
    });
    it('should emit added budgets', (done) => {
      service.budgetAdds$.subscribe((actual: ClientBudget[]) => {
        expect(actual.length).toEqual(2);
        expect(actual[0]).toEqual(expected1);
        expect(actual[1]).toEqual(expected2);
        done();
      });
    });
  });

  describe('budget removes', () => {
    beforeEach(() => {
      angularFirestore = mockFirestoreEvents({ removes: ['id_1', 'id_2'] });
      service = new BudgetService(angularFirestore.Object);
    });
    it('should emit added budgets', (done) => {
      service.budgetRemoves$.subscribe((actual: string[]) => {
        expect(actual.length).toEqual(2);
        expect(actual.includes('id_1')).toBeTruthy();
        expect(actual.includes('id_2')).toBeTruthy();
        done();
      });
    });
  });

  describe('budget updates', () => {
    const added1 = { id: 'some_id', endDate: createTimestamp(10), startDate: createTimestamp(11), name: 'some_name' };
    const expected1 = { id: 'some_id', name: 'some_name', startDate: 11, endDate: 10 };

    const added2 = { id: 'some_id2', endDate: createTimestamp(10), startDate: createTimestamp(11), name: 'some_name2' };
    const expected2 = { id: 'some_id2', name: 'some_name2', startDate: 11, endDate: 10 };

    beforeEach(() => {
      angularFirestore = mockFirestoreEvents({ updates: [added1, added2] });
      service = new BudgetService(angularFirestore.Object);
    });
    it('should emit updates', (done) => {
      service.budgetUpdates$.subscribe((actual: Update<ClientBudget>[]) => {
        expect(actual.length).toEqual(2);
        expect(actual[0].id).toEqual('some_id');
        expect(actual[0].changes).toEqual(expected1);

        expect(actual[1].id).toEqual('some_id2');
        expect(actual[1].changes).toEqual(expected2);
        done();
      });
    });
  });
});
