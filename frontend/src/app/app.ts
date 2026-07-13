import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/auth/auth';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { SharedModule } from './shared/shared-module';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HttpClientModule,
    MatSnackBarModule,
    RouterOutlet,
    CarouselModule,
    MatSnackBarModule,
    SharedModule,
  ],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('im');
}
