import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { Mock } from 'ts-mocks';
import { BudgetItemsService } from '../budget-items.service';
import { BudgetFacade } from './budget.facade';

describe('BudgetFacade', () => {
  const initialState = {};
  let budgetItemService: Mock<BudgetItemsService>;
  let router: Mock<Router>;
  beforeEach(() => {
    router = new Mock<Router>({
      navigate: (commands: string[]) => Promise.resolve(true),
    });
    budgetItemService = new Mock<BudgetItemsService>({
      observeBudget: (id: string) => {},
      stopObservingBudget: (id: string) => {},
    });

    TestBed.configureTestingModule({
      providers: [provideMockStore(initialState), { provide: Router, useValue: router.Object }],
    });
  });

  it('should be created', () => {
    const service: BudgetFacade = TestBed.inject(BudgetFacade);
    expect(service).toBeTruthy();
  });
});
