import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordRepeat } from './directive/password-repeat';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCard } from './components/product-card/product-card';
import { CategoryFilter } from './components/category-filter/category-filter';

@NgModule({
  declarations: [PasswordRepeatDirective, ProductCardComponent, CategoryFilterComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [PasswordRepeatDirective, ProductCardComponent, CategoryFilterComponent],
})
export class SharedModule {}
