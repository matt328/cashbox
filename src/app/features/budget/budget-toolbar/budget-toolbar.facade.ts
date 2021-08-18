import { Injectable } from '@angular/core';
import { ClientBudget, Preferences, User } from '@core/models';
import { BudgetService, FirebaseAuthService, PreferencesService } from '@core/services';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, pluck } from 'rxjs/operators';

@Injectable()
export class BudgetToolbarFacade {
  budgetSummaries$: Observable<ClientBudget[]> = this.budgetService.getAllBudgets();
  currentBudget$: Observable<ClientBudget | undefined> = EMPTY;
  currentUser$: Observable<User | null> = this.authService.user$;
  currentUserId$ = this.currentUser$.pipe(map((user: User | null) => user?.uid));
  prefs$ = this.currentUserId$.pipe(
    mergeMap((userId) => {
      return userId ? this.prefService.getPreferences(userId) : EMPTY;
    })
  );
  prefsCurrentBudget$: Observable<string> = this.prefs$.pipe(pluck('selectedBudgetId')) as Observable<string>;

  constructor(
    private budgetService: BudgetService,
    private authService: FirebaseAuthService,
    private prefService: PreferencesService
  ) {}

  async signOut(): Promise<void> {
    return this.authService.signOut();
  }

  async getInitialBudgetId(budgetIdParam$: Observable<string>, prefsCurrentBudgetId$: Observable<string>): Promise<string> {
    return 'one';
  }

  async updatePreferences(userId: string | undefined, update: Partial<Preferences>): Promise<void> {
    log.debug('updating preferences: ', { userId, update });
    if (userId) {
      return this.prefService.updatePreferences(userId, update);
    } else {
      log.warn('Attempted to update user prefs with null userId.  I dont know what to tell you man.');
    }
  }
}
