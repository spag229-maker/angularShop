import { Component, OnInit } from '@angular/core';
import { CountSelector } from '../../../shared/components/count-selector/count-selector';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgForOf } from '@angular/common';
import { ProductCard } from '../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-cart',
  imports: [CountSelector, RouterLink, CarouselModule, NgForOf, ProductCard],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {

  constructor(private productService: ProductServise) {
  }

  extraProducts: ProductType[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 24,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  ngOnInit() {
    this.productService.getBestProducts()
      .subscribe(ProductType[]) => {
      this.extraProducts = data;
    }
  }

}
