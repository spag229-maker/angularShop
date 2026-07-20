import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../services/product';
import { ProductType } from '../../../../types/product.type';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'product-card',
  imports: [RouterLink, NgForOf, NgIf, FormsModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: ProductType;
  serverStaticPath = environment.serverStaticPath;
  count: number = 1;
  @Input() isLight: boolean = false;

  constructor() {}
}
