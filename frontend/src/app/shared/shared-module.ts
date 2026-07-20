import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordRepeat } from './directive/password-repeat';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCard } from './components/product-card/product-card';
import { CategoryFilter } from './components/category-filter/category-filter';
import { CountSelector } from './components/count-selector/count-selector';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PasswordRepeat,
    ProductCard,
    CategoryFilter,
    CountSelector,
  ],
  exports: [PasswordRepeat, ProductCard, CategoryFilter, CountSelector],
})
export class SharedModule {}
