import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Mock } from 'ts-mocks';
import { BudgetItemGroupComponent } from '../budget-item-group/budget-item-group.component';
import { BudgetItemListComponent } from './budget-item-list.component';
import { BudgetItemListFacade } from './budget-item-list.facade';

describe('BudgetItemListComponent', () => {
  let component: BudgetItemListComponent;
  let fixture: ComponentFixture<BudgetItemListComponent>;
  let facade: Mock<BudgetItemListFacade>;
  let activatedRoute: Mock<ActivatedRoute>;

  beforeEach(() => {
    facade = new Mock<BudgetItemListFacade>({});
    activatedRoute = new Mock<ActivatedRoute>({});

    TestBed.configureTestingModule({
      declarations: [BudgetItemListComponent, BudgetItemGroupComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute.Object }],
    });

    TestBed.overrideComponent(BudgetItemListComponent, {
      set: { providers: [{ provide: BudgetItemListFacade, useValue: facade.Object }] },
    });

    fixture = TestBed.createComponent(BudgetItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
