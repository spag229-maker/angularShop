import { Component } from '@angular/core';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForOf } from '@angular/common';
import { CategoryWithTypeType } from '../../../../types/category-with-type.type';
import { CategoryFilter } from '../../../shared/components/category-filter/category-filter';

@Component({
  selector: 'app-catalog',
  imports: [ProductCard, NgForOf, CategoryFilter],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  products: ProductType[] = [];
  constructor(private productService: ProductService) {}

  categoriesWithTypes: CategoryWithTypeType[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.items;
    });

    this.categoryService.getCategoriesWithTypes().subscribe((data) => {
      this.categoriesWithTypes = data;
    });
  }
}
