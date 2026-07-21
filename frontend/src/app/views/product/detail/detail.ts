import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink} from "@angular/router";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgForOf, NgIf } from '@angular/common';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { ProductType } from '../../../../types/product.type';
import { CountSelector } from '../../../shared/components/count-selector/count-selector';
import { Product } from '../../../shared/services/product';
import { environments } from '../../../../environments/enviroments';
import { CartService } from '../../../shared/services/cart';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  imports: [RouterLink, CarouselModule, NgForOf, ProductCard, NgIf, CountSelector],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail {


  count: number = 1;
  recommendedProducts: ProductType[] = [];
  product!: ProductType;
  serverStaticPath = environments.serverStaticPath;

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

  constructor(
    private productService: Product,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productService.getProduct(params['url']).subscribe((data: ProductType) => {
        this.product = data;
      });
    });

    this.productService.getBestProducts()
      .subscribe((data: ProductType[]) => {
      this.recommendedProducts = data;
    });
  }

  updateCount(value: number) {
    this.count = value;
  }

  addToCart(): void {
    this.cartService.addToCart(this.product.id, this.count).subscribe(() => {
      this._snackBar.open('Товар добавлен в корзину');
    });
  }

}
