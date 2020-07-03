import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mock } from 'ts-mocks';
import { BudgetItemGroupComponent } from '../budget-item-group/budget-item-group.component';
import { BudgetItemListComponent } from './budget-item-list.component';
import { BudgetItemListFacade } from './budget-item-list.facade';

describe('BudgetItemListComponent', () => {
  let component: BudgetItemListComponent;
  let fixture: ComponentFixture<BudgetItemListComponent>;
  let facade: Mock<BudgetItemListFacade>;

  beforeEach(() => {
    facade = new Mock<BudgetItemListFacade>({});
    TestBed.configureTestingModule({
      declarations: [BudgetItemListComponent, BudgetItemGroupComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: BudgetItemListFacade, useValue: facade.Object }],
    });
    fixture = TestBed.createComponent(BudgetItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
