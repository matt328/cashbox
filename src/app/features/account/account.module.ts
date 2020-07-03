import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account.routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [AccountComponent, ToolbarComponent],
  imports: [CommonModule, AccountRoutingModule, MatButtonModule, MatToolbarModule, MatIconModule],
})
export class AccountModule {}
