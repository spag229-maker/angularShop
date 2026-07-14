import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryType } from '../../../types/categoty.type';
import * as url from 'node:url';
import { ProductType } from '../../../types/product.type';

@Service()
export class Product {
  constructor(private http: HttpClient) {}

  getBestProducts(): Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(enviroment.api + 'products/best');
  }

  getProducts(): Observable<{totalCount: number, pages: number, items:ProductType[]}> {
    return this.http.get<{ totalCount: number; pages: number; items: ProductType[] }>(
      enviroment.api + 'products/best',
    );
  }
}
