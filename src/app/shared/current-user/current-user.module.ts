import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CurrentUserComponent } from './current-user.component';

@NgModule({
  declarations: [CurrentUserComponent],
  exports: [CurrentUserComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule],
})
export class CurrentUserModule {}
