import { Component, OnInit } from '@angular/core';
import { CountSelector } from '../../../shared/components/count-selector/count-selector';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgForOf, NgIf } from '@angular/common';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { Product } from '../../../shared/services/product';
import { ProductType } from '../../../../types/product.type';
import { CartService } from '../../../shared/services/cart';
import { CartType } from '../../../../types/cart.type';
import { environments } from '../../../../environments/enviroments';

@Component({
  selector: 'app-cart',
  imports: [CountSelector, RouterLink, CarouselModule, NgForOf, NgIf, ProductCard],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {

  constructor(
    private productService: Product,
    private cartService: CartService,
  ) {
  }

  cart: CartType = { items: [] };
  serverStaticPath = environments.serverStaticPath;
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
    this.cartService.cart$.subscribe((cart: CartType) => {
      this.cart = cart;
    });

    this.productService.getBestProducts()
      .subscribe((data: ProductType[]) => {
      this.extraProducts = data;
    });
  }

  get totalCount(): number {
    return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity).subscribe();
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe();
  }

}
