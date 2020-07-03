import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '@shared/categories/store/categories.service';
import { BudgetFacade } from './budget.facade';

@Component({
  selector: 'cbx-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetComponent implements OnInit, OnDestroy {
  constructor(public budgetFacade: BudgetFacade, private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.budgetFacade.init();
  }

  ngOnDestroy(): void {
    this.budgetFacade.destroy();
  }
}
