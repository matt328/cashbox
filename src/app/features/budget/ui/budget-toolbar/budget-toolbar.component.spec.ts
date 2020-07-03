import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mock } from 'ts-mocks';
import { BudgetFacade } from '../budget.facade';
import { BudgetToolbarComponent } from './budget-toolbar.component';

describe('BudgetToolbarComponent', () => {
  let component: BudgetToolbarComponent;
  let fixture: ComponentFixture<BudgetToolbarComponent>;
  let budgetFacade: Mock<BudgetFacade>;

  beforeEach(() => {
    budgetFacade = new Mock<BudgetFacade>({});
    TestBed.configureTestingModule({
      declarations: [BudgetToolbarComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: BudgetFacade, useValue: budgetFacade.Object }],
    });
    fixture = TestBed.createComponent(BudgetToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
