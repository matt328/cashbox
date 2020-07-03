import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesService } from '@shared/categories/store/categories.service';
import { Mock } from 'ts-mocks';
import { BudgetComponent } from './budget.component';
import { BudgetFacade } from './budget.facade';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let budgetFacade: Mock<BudgetFacade>;
  let categoryService: Mock<CategoriesService>;

  beforeEach(async(() => {
    budgetFacade = new Mock<BudgetFacade>({
      init: () => {},
      destroy: () => {},
    });
    categoryService = new Mock<CategoriesService>({});
    TestBed.configureTestingModule({
      declarations: [BudgetComponent],
      providers: [
        { provide: BudgetFacade, useValue: budgetFacade.Object },
        { provide: CategoriesService, useValue: categoryService.Object },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
