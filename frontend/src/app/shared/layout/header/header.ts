import { Component, Input } from '@angular/core';
import { CategoryType } from '../../../../types/categoty.type';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryWithTypeType } from '../../../../types/category-with-type.type';
import { NgForOf, NgIf } from '@angular/common';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatMenu, MatMenuItem, MatMenuTrigger, MatIcon, NgIf, NgForOf],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLogged: boolean = false;
  cartCount: number = 0;
  @Input() categories: CategoryWithTypeType[] = [];

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private cartService: CartService,
  ) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    this.cartService.cartCount$.subscribe((count: number) => {
      this.cartCount = count;
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.doLogout();
      },
      error: () => {
        this.doLogout();
      }
    });
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

}
