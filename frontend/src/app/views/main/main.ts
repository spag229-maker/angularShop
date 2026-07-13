import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/services/product';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [RouterLink, ProductCard, NgForOf],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

  products: ProductType[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getBestProducts().subscribe((ProductType[]) => {
      this.products = data;
    })
  }
}
