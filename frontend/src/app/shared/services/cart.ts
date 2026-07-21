import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CartType } from '../../../types/cart.type';
import { DefaultResponseType } from '../../../types/default-response.type';
import { environments } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartType>({ items: [] });
  public cart$ = this.cartSubject.asObservable();

  public cartCount$ = this.cart$.pipe(
    map(cart => cart.items.reduce((sum, item) => sum + item.quantity, 0)),
  );

  constructor(private http: HttpClient) {
    this.getCart().subscribe();
  }

  getCart(): Observable<CartType> {
    return this.http
      .get<CartType>(environments.api + 'cart', { withCredentials: true })
      .pipe(tap(cart => this.cartSubject.next(cart)));
  }

  updateQuantity(productId: string, quantity: number): Observable<CartType> {
    return this.http
      .post<CartType>(
        environments.api + 'cart',
        { productId, quantity },
        { withCredentials: true },
      )
      .pipe(tap(cart => this.cartSubject.next(cart)));
  }

  addToCart(productId: string, quantity: number = 1): Observable<CartType> {
    const existingItem = this.cartSubject.value.items.find(
      item => item.product.id === productId,
    );
    const newQuantity = (existingItem ? existingItem.quantity : 0) + quantity;
    return this.updateQuantity(productId, newQuantity);
  }

  removeFromCart(productId: string): Observable<CartType> {
    return this.updateQuantity(productId, 0);
  }

  clearCart(): Observable<DefaultResponseType> {
    return this.http
      .delete<DefaultResponseType>(environments.api + 'cart', { withCredentials: true })
      .pipe(tap(() => this.cartSubject.next({ items: [] })));
  }
}
