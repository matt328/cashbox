import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Mock } from 'ts-mocks';
import { BudgetToolbarComponent } from './budget-toolbar.component';
import { BudgetToolbarFacade } from './budget-toolbar.facade';

describe('BudgetToolbarComponent', () => {
  let component: BudgetToolbarComponent;
  let fixture: ComponentFixture<BudgetToolbarComponent>;
  let budgetToolbarFacade: Mock<BudgetToolbarFacade>;
  let router: Mock<Router>;
  let activatedRoute: Mock<ActivatedRoute>;

  beforeEach(() => {
    budgetToolbarFacade = new Mock<BudgetToolbarFacade>({});
    router = new Mock<Router>({
      navigate: () => Promise.resolve(true),
    });
    activatedRoute = new Mock<ActivatedRoute>({
      params: of({ id: 'some_id' }),
    });

    TestBed.configureTestingModule({
      declarations: [BudgetToolbarComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Router, useValue: router.Object },
        { provide: ActivatedRoute, useValue: activatedRoute.Object },
      ],
    });

    TestBed.overrideComponent(BudgetToolbarComponent, {
      set: { providers: [{ provide: BudgetToolbarFacade, useValue: budgetToolbarFacade.Object }] },
    });

    fixture = TestBed.createComponent(BudgetToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
