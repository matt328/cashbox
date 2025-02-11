import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValueFormComponent } from './value-form.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule, MatInputModule],
  declarations: [ValueFormComponent],
  exports: [ValueFormComponent],
})
export class ValueFormModule {}
