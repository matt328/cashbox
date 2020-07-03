import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/categories.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('category', reducer), AngularFireDatabaseModule, AngularFireModule],
  providers: [],
})
export class CategoriesModule {}
