import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductType } from '../../../types/product.type';
import { ActiveParamsType } from '../../../types/active-params.type';
import { environments } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class Product {
  constructor(private http: HttpClient) {}

  getBestProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environments.api + 'products/best');
  }

  getProducts(params: ActiveParamsType): Observable<{totalCount: number, pages: number, items: ProductType[]}> {
    return this.http.get<{ totalCount: number; pages: number; items: ProductType[] }>(
      environments.api + 'products', {
        params: params as any
      }
    );
  }

  getProduct(url: string): Observable<ProductType> {
    return this.http.get<ProductType>(
      environments.api + 'products/' + url);
  }
}
