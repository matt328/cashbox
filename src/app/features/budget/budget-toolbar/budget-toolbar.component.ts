import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientBudget } from '@core/models';
import { SidenavService } from '@core/services';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, pluck } from 'rxjs/operators';
import { BudgetToolbarFacade } from './budget-toolbar.facade';

@Component({
  templateUrl: './budget-toolbar.component.html',
  styleUrls: ['./budget-toolbar.component.scss'],
  providers: [BudgetToolbarFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetToolbarComponent {
  currentBudget$: Observable<ClientBudget | undefined> = EMPTY;

  constructor(
    public budgetToolbarFacade: BudgetToolbarFacade,
    public sidenavService: SidenavService,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute
  ) {
    const currentBudgetId$: Observable<string> = this.activatedRoute.params.pipe(pluck('id'));
    this.currentBudget$ = currentBudgetId$.pipe(
      mergeMap((id: string) =>
        this.budgetToolbarFacade.budgetSummaries$.pipe(
          map((budgets: ClientBudget[]) => budgets.filter((budget) => budget.id === id)[0])
        )
      )
    );
  }

  selectBudget(budgetId: string): void {
    this.ngZone.run(() => this.router.navigate(['budgets', budgetId]));
  }
}
