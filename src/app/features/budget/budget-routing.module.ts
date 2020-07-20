import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetToolbarComponent } from './budget-toolbar/budget-toolbar.component';
import { BudgetComponent } from './budget.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetComponent,
  },
  {
    path: '',
    outlet: 'toolbar',
    component: BudgetToolbarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetRoutingModule {}
