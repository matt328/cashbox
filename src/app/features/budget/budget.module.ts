import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { InlineEditModule } from '@shared/inline-edit';
import { ValueFormModule } from '@shared/value-form';
import { BudgetItemGroupComponent } from './budget-list/budget-item-group/budget-item-group.component';
import { BudgetItemListComponent } from './budget-list/budget-item-list/budget-item-list.component';
import { BudgetItemComponent } from './budget-list/budget-item/budget-item.component';
import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetToolbarComponent } from './budget-toolbar/budget-toolbar.component';
import { BudgetComponent } from './budget.component';
import { MonthSelectorComponent } from './month-selector/month-selector.component';

@NgModule({
  imports: [
    CommonModule,
    BudgetRoutingModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    MatCardModule,
    SatPopoverModule,
    ValueFormModule,
    InlineEditModule,
  ],
  declarations: [
    BudgetComponent,
    BudgetToolbarComponent,
    BudgetItemGroupComponent,
    BudgetItemListComponent,
    MonthSelectorComponent,
    BudgetItemComponent,
  ],
})
export class BudgetModule {}
