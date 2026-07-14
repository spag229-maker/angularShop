import { Component } from '@angular/core';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-catalog',
  imports: [ProductCard, NgForOf],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  products: ProductType[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.items;
    });
  }
}
