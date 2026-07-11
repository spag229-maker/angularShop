import { Component } from '@angular/core';
import { CategoryType } from '../../../../types/categoty.type';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth';
import { MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatMenuItem, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLogged: boolean = false;
  @Input() categories: CategoryType[] = [];

  constructor(private authService: AuthService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });
  }

  logout(): void {

  }

}
