import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UtilsModule } from '../utils/utils.module';
import { InlineEditComponent } from './inline-edit.component';

@NgModule({
  imports: [CommonModule, MatInputModule, FormsModule, UtilsModule],
  declarations: [InlineEditComponent],
  exports: [InlineEditComponent],
})
export class InlineEditModule {}
