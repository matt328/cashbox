import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardPipeFn, AUTH_GUARD } from '@core/guards';
import { LoginComponent } from './features/login/login.component';
import { MainComponent } from './features/main/main.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [AUTH_GUARD],
    data: { authGuardPipe: authGuardPipeFn },

    children: [
      { path: '', redirectTo: 'budgets', pathMatch: 'full' },
      {
        path: 'budgets',
        loadChildren: () => import('./features/budget/budget.module').then((m) => m.BudgetModule),
      },
      {
        path: 'budgets/:id',
        loadChildren: () => import('./features/budget/budget.module').then((m) => m.BudgetModule),
      },
      {
        path: 'accounts',
        loadChildren: () => import('./features/account/account.module').then((m) => m.AccountModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
