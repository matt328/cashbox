import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, AngularFireAuthGuardModule, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { MainComponent } from './features/main/main.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },

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
  imports: [AngularFireAuthGuardModule, RouterModule.forRoot(routes, { useHash: false, enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
