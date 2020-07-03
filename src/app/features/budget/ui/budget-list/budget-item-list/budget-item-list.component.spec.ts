import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetItemGroupComponent } from '../budget-item-group/budget-item-group.component';
import { BudgetItemListComponent } from './budget-item-list.component';
import { BudgetItemListFacade } from './budget-item-list.facade';
import { Mock } from 'ts-mocks';

describe('BudgetItemListComponent', () => {
  let component: BudgetItemListComponent;
  let fixture: ComponentFixture<BudgetItemListComponent>;
  let facade: Mock<BudgetItemListFacade>;

  beforeEach(async(() => {
    facade = new Mock<BudgetItemListFacade>({});
    TestBed.configureTestingModule({
      declarations: [BudgetItemListComponent, BudgetItemGroupComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: BudgetItemListFacade, useValue: facade.Object }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
