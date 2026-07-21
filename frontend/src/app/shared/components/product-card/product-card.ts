import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../services/product';
import { ProductType } from '../../../../types/product.type';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environments } from '../../../../environments/enviroments';
import { CartService } from '../../services/cart';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'product-card',
  imports: [RouterLink, NgForOf, NgIf, FormsModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: ProductType;
  serverStaticPath = environments.serverStaticPath;
  count: number = 1;
  @Input() isLight: boolean = false;

  constructor(
    private cartService: CartService,
    private _snackBar: MatSnackBar,
  ) {}

  addToCart(): void {
    this.cartService.addToCart(this.product.id, 1).subscribe(() => {
      this._snackBar.open('Товар добавлен в корзину');
    });
  }
}
