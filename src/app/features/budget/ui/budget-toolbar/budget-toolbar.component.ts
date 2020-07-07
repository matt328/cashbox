import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidenavService } from '@core/services';
import { BudgetFacade } from '../budget.facade';

@Component({
  templateUrl: './budget-toolbar.component.html',
  styleUrls: ['./budget-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetToolbarComponent {
  constructor(public budgetFacade: BudgetFacade, public sidenavService: SidenavService) {}
}

//TODO dark theme
