import { Injectable } from '@angular/core';
import { ClientBudget, User } from '@core/models';
import { BudgetService, FirebaseAuthService } from '@core/services';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class BudgetToolbarFacade {
  budgetSummaries$: Observable<ClientBudget[]> = this.budgetService.getAllBudgets();
  currentBudget$: Observable<ClientBudget | undefined> = EMPTY;
  currentUser$: Observable<User | null> = this.authService.user$;

  constructor(private budgetService: BudgetService, private authService: FirebaseAuthService) {}

  async signOut(): Promise<void> {
    return this.authService.signOut();
  }
}
