import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Mock } from 'ts-mocks';
import { BudgetComponent } from './budget.component';
import { NewBudgetFacade } from './new-budget.facade';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let budgetFacade: Mock<NewBudgetFacade>;
  let mockRoute: Mock<ActivatedRoute>;

  beforeEach(() => {
    budgetFacade = new Mock<NewBudgetFacade>({
      getBudgetItemsForBudget: (id: string) => of([]),
    });

    mockRoute = new Mock<ActivatedRoute>({
      params: of({ id: 'some_id' }),
    });

    TestBed.configureTestingModule({
      declarations: [BudgetComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockRoute.Object }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    TestBed.overrideComponent(BudgetComponent, {
      set: { providers: [{ provide: NewBudgetFacade, useValue: budgetFacade.Object }] },
    });

    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
