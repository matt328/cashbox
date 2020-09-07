import { ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientBudget } from '@core/models';
import { SidenavService } from '@core/services';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { map, mergeMap, pluck, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { BudgetToolbarFacade } from './budget-toolbar.facade';

const createPrefsUpdate = map(([selectedBudgetId, userId]: [string, string | undefined]) => ({
  userId,
  update: { selectedBudgetId },
}));

@Component({
  templateUrl: './budget-toolbar.component.html',
  styleUrls: ['./budget-toolbar.component.scss'],
  providers: [BudgetToolbarFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetToolbarComponent implements OnInit, OnDestroy {
  currentBudget$: Observable<ClientBudget | undefined> = EMPTY;

  monthSelected$ = new Subject<string>();

  private destroy$ = new Subject<void>();

  constructor(
    public facade: BudgetToolbarFacade,
    public sidenavService: SidenavService,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute
  ) {}

  async menuItemSelected(item: 'ITEM1' | 'PREFERENCES' | 'SIGN_OUT'): Promise<void> {
    log.debug('Menu Item Selected: ', item);
    if (item === 'SIGN_OUT') {
      await this.facade.signOut();
      this.ngZone.run(() => this.router.navigate(['login']));
    }
  }

  ngOnInit(): void {
    const budgetIdParam$: Observable<string> = this.activatedRoute.params.pipe(
      pluck('id'),
      mergeMap((param) => (param ? of(param) : this.facade.prefsCurrentBudget$)),
      tap((x) => this.ngZone.run(() => this.router.navigate(['budgets', x])))
    );

    this.currentBudget$ = budgetIdParam$.pipe(
      mergeMap((id: string) =>
        this.facade.budgetSummaries$.pipe(map((budgets: ClientBudget[]) => budgets.find((budget) => budget.id === id)))
      )
    );

    this.monthSelected$
      .pipe(withLatestFrom(this.facade.currentUser$), takeUntil(this.destroy$))
      .subscribe(([selectedBudgetId, user]) => {
        this.facade.updatePreferences(user?.uid, { selectedBudgetId });
        this.ngZone.run(() => this.router.navigate(['budgets', selectedBudgetId]));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
