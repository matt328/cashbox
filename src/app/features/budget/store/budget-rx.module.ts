import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BudgetItemEffects } from './budgetItems/effects';
import { BudgetEffects } from './budgets/effects';
import { FEATURE_REDUCER_TOKEN, getReducers, sliceName } from './interfaces';

@NgModule({
  imports: [
    MatSnackBarModule,
    StoreModule.forFeature(sliceName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([BudgetEffects, BudgetItemEffects]),
  ],
  providers: [{ provide: FEATURE_REDUCER_TOKEN, useFactory: getReducers }],
})
export class BudgetRxModule {}
