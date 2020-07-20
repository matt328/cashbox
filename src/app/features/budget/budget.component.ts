import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientBudgetItem } from '@core/models';
import { Observable } from 'rxjs';
import { mergeMap, pluck } from 'rxjs/operators';
import { NewBudgetFacade } from './new-budget.facade';

@Component({
  selector: 'cbx-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NewBudgetFacade],
})
export class BudgetComponent {
  private currentBudgetId$: Observable<string> = this.route.params.pipe(pluck('id'));
  currentBudgetItems$: Observable<ClientBudgetItem[]> = this.currentBudgetId$.pipe(
    mergeMap((id: string) => this.newBudgetFacade.getBudgetItemsForBudget(id))
  );

  constructor(private newBudgetFacade: NewBudgetFacade, private route: ActivatedRoute) {}
}
