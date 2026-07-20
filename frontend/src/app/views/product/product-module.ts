import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing-module';
import { Catalog } from './catalog/catalog';
import { Detail } from './detail/detail';
import { SharedModule } from '../../shared/shared-module';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  imports: [CommonModule, ProductRoutingModule, CarouselModule, SharedModule],
})
export class ProductModule {}
